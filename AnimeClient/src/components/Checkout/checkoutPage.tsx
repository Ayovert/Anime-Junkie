import { useAppDispatch } from "../../shared/redux/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import agent from "../../shared/api/agent";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomStepper from "../../shared/reuse/CustomStepper";
import { clearCart } from "../Cart/cartSlice";
import AddressForm from "./addressForm";
import { validationSchema } from "./checkoutValidation";
import { paymentOptions } from "./checkoutData";
import ReviewForm from "./ReviewForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FlutterResponse } from "../../shared/model/order";
import { UserAddress } from "../../shared/model/user";
import { getUserAddress } from "../Account/UserSlice";

const steps = ["Shipping address", "Review your order"];

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0].value);


  function handlePaymentOptions(e: React.ChangeEvent<HTMLInputElement>) {
    setPaymentMethod(e.target.value);
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return (
          <ReviewForm
            selectedValue={paymentMethod}
            onChange={handlePaymentOptions}
          />
        );
      /* case 2:
        return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} />;*/
      default:
        throw new Error("Unknown step");
    }
  }

  // const tranId = parseInt(tranIdStr);

  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const [orderNumber, setOrderNumber] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const [loading, setLoading] = useState(false);


  const mountedRef = useRef(true);

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationSchema),
  });

  //let tranStatus = "test";
  const tranStatus = searchParams.get("status");

  const tranRef = searchParams.get("tx_ref");

  const tranIdStr = searchParams.get("transaction_id");

  //const tranIdStr = null;
  const tranId = tranIdStr ? parseInt(tranIdStr) : 0;

  const tranExists = tranStatus && tranRef && tranId !== 0 && tranId > 0;


  /*if (tranIdStr) {
    setTranId(parseInt(tranIdStr));
  }*/

  //flutterpayment

  const verifyPayment = useCallback(async () => {
    try {
      if (tranExists) {
        agent.Orders.getByTranRef(tranRef).then(async (response: any) => {
          if (tranStatus === "successful" || tranStatus === "completed") {
          

            setOrderNumber(response.orderId);
            setPaymentSucceeded(true);
            setPaymentMessage("Thank you - we have received your payment");
            setActiveStep(steps.length);
            dispatch(clearCart());
            setLoading(false);
          } else {
            setPaymentMessage("Payment was not successful. Please try again");
            setPaymentSucceeded(false);
            setLoading(false);
            setActiveStep(steps.length);
          }

         if (tranId) {
            await agent.Payment.verifyPayment(tranId);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, tranExists,tranRef,tranId, tranStatus]);



  async function PayFlutter(data: FieldValues) {
    // setLoading(true);
    // https://api.ravepay.co/flwv3-pug/getpaidx/api/charge 400
    const { nameOnCard, saveAddress, ...shippingAddress } = data;

    const baseUrl = window.location.origin;

    const checkoutUrl = `${baseUrl}/checkout`;


    try {
      await agent.Orders.create({
        saveAddress,
        shippingAddress,
        checkoutUrl,
      }).then((response: FlutterResponse) => {
        if (response.status === "success") {

          navigate("/redirect", {
            state: {
              url: response.data.link,
            },
            replace: true,
          });
        }

        setLoading(false);
      });
    } catch (error: any) {
      console.log(error);
      setPaymentMessage("Could not create order. Try again");
      setPaymentSucceeded(false);
      setLoading(false);
      setActiveStep(activeStep + 1);
    }

    //get from backend
  }

  useEffect(() => {
    try {
      if (tranExists) {
       
          verifyPayment();
      
      } else {
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
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    return () => {
      mountedRef.current = false;
    };
    // }, [checkPayment, tranId, tranRef, tranStatus]);
  }, [methods, dispatch, tranExists, tranRef, verifyPayment]);

  const handleNext = async (data: FieldValues) => {
    if (activeStep === steps.length - 1) {
      await PayFlutter(data);

      //await submitOrder(data);
    } else {
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
        <div className="w-full mx-5 my-10 md:m-20 flex flex-col justify-center items-center">
          <h3 className="text-2xl">Checkout</h3>
          <CustomStepper stepItems={steps} activeStep={activeStep} />
          {activeStep === steps.length ? (
            <div className="my-10 flex flex-col justify-center items-center">
              <h5 className="text-xl my-3">{paymentMessage}</h5>
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
            </div>
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
