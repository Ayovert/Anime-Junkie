import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { useEffect, useRef, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import agent from "../../shared/api/agent";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomStepper from "../../shared/reuse/CustomStepper";
import { clearCart, setCart } from "../Cart/cartSlice";
import AddressForm from "./addressForm";
import { validationSchema } from "./checkoutValidation";
import { config, paymentOptions } from "./checkoutData";
import ReviewForm from "./ReviewForm";
import { stat } from "fs";
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";
import { currencyFormat, getCartTotal } from "../../shared/util/util";

const steps = ["Shipping address", "Review your order"];

export default function CheckoutPage2() {
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0].value);


  function handlePaymentOptions(e: React.ChangeEvent<HTMLInputElement>) {
    setPaymentMethod(e.target.value);
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <ReviewForm selectedValue={paymentMethod} onChange={handlePaymentOptions} />;
      /* case 2:
        return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} />;*/
      default:
        throw new Error("Unknown step");
    }
  }

  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const [orderNumber, setOrderNumber] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const [loading, setLoading] = useState(false);

  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const [userDetails, setUserDetails ] = useState<any>({});

  const [tranRef, setTranRef] = useState("");

  const { total } = getCartTotal(cart);

  let cartTotal2dp = (total/100).toFixed(2);
  const cartTotal = parseFloat(cartTotal2dp);


  const mountedRef = useRef(true);

  const dispatch = useAppDispatch();
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationSchema),
  });

  //flutterpayment

  const config = {
    public_key: "FLWPUBK_TEST-33147e90d7f689b369980a140ca72517-X", //flutter
    tx_ref: tranRef, // cart
    amount: cartTotal, //cart total
    currency: "NGN",
    payment_options:"card, banktransfer, ussd", //state from radio cart page button
    redirect_url: "", //location
    meta: {
      consumer_id: user!.username, //userId
      consumer_mac: user?.token.slice(15, 30), //dunno
    },
    customer: {
      email: user!.email, // user
      phonenumber: userDetails.telephone, //user
      name: userDetails.fullName, // user
    },
    customizations: {
      title: "The Clans Store", // store name
      description: "Payment for an anime merch",
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg", // logo
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  async function payFlutter(data: FieldValues) {
    setLoading(true);
    // https://api.ravepay.co/flwv3-pug/getpaidx/api/charge 400
    const { nameOnCard, saveAddress, ...shippingAddress } = data;


    try {
      handleFlutterPayment({
        callback: async (response) => {
          console.log(response);

          const { status, transaction_id, amount } = response;

          const paymentStatus = status;
          const transactionId = transaction_id;
          const chargedAmount = amount;

          if (paymentStatus === "successful" || paymentStatus === "completed") {
            const orderNumber = await agent.Orders.create({
              saveAddress,
              shippingAddress,
              paymentStatus,
              transactionId,
              chargedAmount,
            });

            setOrderNumber(orderNumber);
            setPaymentSucceeded(true);
            setPaymentMessage("Thank you - we have received your payment");
            setActiveStep(activeStep + 1);
            dispatch(clearCart());
            setLoading(false);
          } else {
            setPaymentMessage("payment failed");
            setPaymentSucceeded(false);
            setLoading(false);
            setActiveStep(activeStep + 1);
          }
          closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {
          setPaymentMessage("payment cancelled");
          setPaymentSucceeded(false);
          setLoading(false);
          setActiveStep(activeStep + 1);
        },
      });
    } catch (error: any) {
      console.log(error);
      setPaymentMessage(error);
      setPaymentSucceeded(false);
      setLoading(false);
      setActiveStep(activeStep + 1);
      closePaymentModal();
      setLoading(false);
    }
  }

  useEffect(() => {
    agent.Payment.createFlutterPayment()
      .then((cart) => {
        dispatch(setCart(cart));

        setTranRef(cart.tranRef);
      })
      .catch((error) => {
        console.log(error);
      });
    // .finally(() => setLoading(false))

    agent.User.fetchAddress()
      .then((response) => {
        if (response) {
          methods.reset({
            ...methods.getValues(),
            ...response,
            saveAddress: false,
          });
        }
      })
      .catch((error) => console.log(error));

    return () => {
      mountedRef.current = false;
    };
  }, [methods, dispatch]);

  const handleNext = async (data: FieldValues) => {
    if (activeStep === steps.length - 1) {
      setUserDetails(data);
      await payFlutter(data);
     
      //await submitOrder(data);
    } else {
      setUserDetails(data);
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function submitDisabled(): boolean {
    return !methods.formState.isValid;
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="w-full m-20 flex flex-col justify-center items-center">
          <h3 className="text-2xl">Checkout</h3>
          <CustomStepper stepItems={steps} activeStep={activeStep} />
          {activeStep === steps.length ? (
            <>
              <h5 className="text-xl">{paymentMessage}</h5>
              {paymentSucceeded ? (
                <span className="text-2xl">
                  Your order number is #{orderNumber}. We have not emailed your
                  order confirmation, and will not send you an update when your
                  order has shipped as this is a fake store.
                </span>
              ) : (
                <>
                  <span className="text-2xl">
                    Uh-oh. Please try again, or contact support if you're
                    encountering difficulties making payment.
                  </span>
                  <ButtonCustom
                    name="Try Again"
                    buttonClass="bg-red-500 text-white !px-8 !py-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-lg normal-case"
                    className="mt-7"
                    onClick={handleBack}
                  />
                </>
              )}
            </>
          ) : (
            <form
              className="w-full flex flex-col items-center justify-center"
              onSubmit={methods.handleSubmit(handleNext)}
            >
              {getStepContent(activeStep)}

              <div className="flex w-full justify-around">
                {activeStep !== 0 && (
                  <ButtonCustom
                    name="Back"
                    buttonClass="bg-red-500 text-white !px-8 !py-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-lg normal-case"
                    className="mt-7"
                    onClick={() => handleBack()}
                  />
                )}

                <ButtonCustom
                  type="submit"
                  name={`${
                    activeStep === steps.length - 1 ? "Place order" : "Next"
                  }`}
                  buttonClass="bg-red-500 text-white !px-8 !py-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-lg normal-case"
                  className="mt-7"
                  loading={loading}
                  disabled={submitDisabled()}
                />
              </div>
            </form>
          )}
        </div>
      </FormProvider>
    </>
  );
}
