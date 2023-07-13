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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FlutterResponse } from "../../shared/model/order";
import { UserAddress } from "../../shared/model/user";
import { getUserAddress } from "../Account/UserSlice";
import { isObjectEmpty } from "../../shared/util/util";
import LoadingComponent2 from "../../shared/reuse/LoadingComponent2";

const steps = ["Shipping address", "Review your order"];

export default function CheckoutPage() {
  const location: any = useLocation();

  const address = location.state;

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
  const [loading, setLoading] = useState(true);

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
  }, [dispatch, tranExists, tranRef, tranId, tranStatus]);

  const PayFlutter = useCallback(async () => {
    // setLoading(true);
    // https://api.ravepay.co/flwv3-pug/getpaidx/api/charge 400
    const { saveAddress, ...shippingAddress } = address;
    const baseUrl = window.location.origin;

    const checkoutUrl = `${baseUrl}/checkout`;

    setLoading(false);

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
    }

    //get from backend
  }, [address]);

  useEffect(() => {
    try {
      if (tranExists) {
        verifyPayment();
      }

      if (address && !isObjectEmpty(address)) {
        console.log("pay flutter");
        PayFlutter();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    return () => {
      
      mountedRef.current = false;
    };
    // }, [checkPayment, tranId, tranRef, tranStatus]);
  }, [tranExists, verifyPayment, address, PayFlutter]);

  if (loading) return <LoadingComponent2 message="Loading Checkout... " />;

  return (
    <>
      <div className="h-full mx-5 my-10 md:m-20 flex flex-col justify-center items-center">
        <h3 className="text-2xl">Checkout</h3>

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
                //onClick={handleBack}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
