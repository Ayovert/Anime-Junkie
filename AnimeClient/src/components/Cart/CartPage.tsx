import { useCallback, useEffect, useRef, useState } from "react";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomRadioButton from "../../shared/reuse/CustomRadioButton";
import { ReactComponent as ClockIcon } from "../../assets/images/icons/clockIcon.svg";
import { ReactComponent as LocationIcon } from "../../assets/images/icons/locationIcon.svg";

import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import { removeCartItemAsync } from "./cartSlice";
import {
  currencyFormat,
  getCartTotal,
  isObjectEmpty,
} from "../../shared/util/util";
import CardLogo from "../../assets/images/icons/cardLogo";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../Account/UserSlice";
import LoadingComponent2 from "../../shared/reuse/LoadingComponent2";
import AddressForm2 from "../Checkout/addressForm2";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../Checkout/checkoutValidation";
import { getAddress } from "../Checkout/getAddress";
import reactCSS from "reactcss";
import { url } from "inspector";

const paymentOptions = [
  { value: "cash", label: "Cash on Delivery" },
  { value: "card", label: "Credit / Debit Card", logo: <CardLogo /> },
];

export default function CartPage() {
  const currentValidationSchema = validationSchema[0];

  //methods: UseFormReturn<FieldValues, any>
  const methods = useForm({
    mode: "all",

    resolver: yupResolver(currentValidationSchema),
  });
  const [selectedValue, setSelectedValue] = useState(paymentOptions[0].value);

  const [loading, setLoading] = useState(true);

  const [showAddress, setShowAddress] = useState(false);

  const [address, setAddress] = useState<any>({});

  console.log(address);

  const { cart } = useAppSelector((state) => state.cart);

  const mountedRef = useRef(true);

  const { subtotal, deliveryFee, total, tax } = getCartTotal(cart);
  const dispatch = useAppDispatch();

  const initCart = useCallback(async () => {
    try {
      //  AxiosInterceptors(navigate);
      await dispatch(getCurrentUser());

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getAddress(methods);
  }, [methods]);

  useEffect(() => {
    try {
      initCart();
      setShowAddress(false);
      return () => {
        mountedRef.current = false;
      };
    } catch (error) {
      console.log(error);
    }
  }, [initCart]);

  function closeAddress() {
    setShowAddress(false);
  }

  function openAddress() {
    setShowAddress(true);
  }

  function submitDisabled(): boolean {
    return !methods.formState.isValid;
  }

  const saveAddress = async (data: FieldValues) => {
    setAddress(data);

    // console.log(data);
    closeAddress();
  };

  if (loading) return <LoadingComponent2 message="Loading Cart... " />;

  /* if (!cart)
    return (
      <div className="w-full flex flex-col items-center justify-center h-[67vh]">
        <img
          src="/images/emptyWishList.png"
          alt="empty wishlist"
          className="h-[70%] md:h-full
                xl:h-72
                object-contain "
        />

        <h3 className="text-2xl">Oops. No items in your cart yet!</h3>
        <Link to="/shop">
          <ButtonCustom
            name="Get something from the shop"
            buttonClass="text-white !text-xl whitespace-normal break-none w-full  bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg flex justify-between p-4 my-7"
          />
        </Link>
      </div>
    );*/

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <div className="m-0 lg:px-20 lg:py-28 w-screen">
          {showAddress && (
            <AddressForm2
              closeAddress={closeAddress}
              showAddress={showAddress}
              submitDisabled={submitDisabled()}
              saveAddress={saveAddress}
            />
          )}
          <div className="flex flex-col md:flex-row flex-wrap">
            <div className="flex1 w-full md:w-1/2 py-7 px-6 md:pr-9">
              <div className="MyItems my-3">
                <h3 className="font-[Rakkas] mb-5 text-2xl">Your Items</h3>

                {!cart && (
                  <div className="">
                    <img
                      alt="no orders image"
                      src="/images/emptyState.png"
                      className="h-36"
                    />

                    <p className="my-6">
                      Uh-oh, nothing to see here...yet. Make your first order to
                      view history
                    </p>

                    <Link to="/shop">
                      <ButtonCustom
                        name="Explore Products"
                        className="my-6"
                        buttonClass={`bg-black hover:!bg-black/80 px-10 text-white  normal-case h-16`}
                        textClass="justify-center text-base lg:text-lg whitespace-nowrap"
                      />
                    </Link>
                  </div>
                )}
                {cart &&
                  cart.items.map((item) => (
                    <div
                      className=" flex justify-between items-center my-4 text-xl"
                      key={item.name}
                    >
                      <div className="item flex my-5">
                        <img
                          alt="itemImage"
                          src={item.pictureUrl}
                          className="h-15 w-20"
                        />

                        <div className="ml-5">
                          <div>
                            <span className="mx-1">{item.quantity}x</span>
                            <span>{item.name}</span>
                          </div>
                          <div className="">
                            <span
                              className="ml-1 mr-4 text-red-500"
                              onClick={() =>
                                dispatch(
                                  removeCartItemAsync({
                                    productId: item.productId,
                                    quantity: item.quantity,
                                    name: "del",
                                  })
                                )
                              }
                            >
                              Remove
                            </span>
                            <span>• Edit</span>
                          </div>
                        </div>
                      </div>
                      <span className="price">
                        {currencyFormat(item.price)}{" "}
                      </span>
                    </div>
                  ))}

                {cart &&
                  cart.specials.map((item, index) => {
                    const styles = reactCSS({
                      default: {
                        color: {
                          //  background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
                          background: `#${item.materialColor}`,
                        },
                        image: {
                          backgroundImage: `url(${item.conceptSketchURL})`,
                        },
                      },
                    });

                    console.log(item.conceptSketchURL);
                    return (
                      <div
                        className=" flex justify-between items-center my-4 text-xl"
                        key={index}
                      >
                        <div className="item flex my-5 ">
                          <img
                            alt="itemImage"
                            src={item.conceptSketchURL}
                            className="h-15 w-20"
                          />

                          <div className="ml-5">
                            <div className="w-full">
                              <span className="w-1/3">{item.quantity}x</span>
                              <div className="h-8 w-2/3" style={styles.color}>
                                {" "}
                              </div>
                            </div>

                            <span className="">{item.merchType}</span>

                            <div className="">
                              <span className="mr-4 text-red-500">Remove</span>
                              <span>• Edit</span>
                            </div>
                          </div>
                        </div>
                        <span className="price">N/A</span>
                      </div>
                    );
                  })}
              </div>

              <div className="DeliveryDeets my-9">
                <h3 className="font-[Rakkas] text-2xl">Delivery details</h3>
                <div className="my-5 flex items-center text-lg">
                  <ClockIcon />
                  <span className="ml-3">{!cart ? "" : "2"} Days</span>
                </div>

                <div className="my-3 flex justify-between items-center text-sm">
                  {cart ? (
                    <div className="flex items-center text-lg">
                      <LocationIcon />
                      {address && !isObjectEmpty(address) ? (
                        <span className="ml-3">{`${address.address1}, ${address.address2}, ${address.city}, ${address.state}`}</span>
                      ) : (
                        <span className="ml-3 text-red-500">
                          No address available
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center text-lg">
                      <LocationIcon />
                      <span className="ml-3">Location</span>
                    </div>
                  )}

                  <h4
                    className="bg-neutral-100 font-bold px-5 py-3 rounded-2xl text-base "
                    onClick={() => {
                      openAddress();
                    }}
                  >
                    Change
                  </h4>
                </div>
              </div>
              <div className="Payment my-7">
                <h3 className="font-[Rakkas] text-2xl">Payment</h3>
                <div className="my-2">
                  <CustomRadioButton
                    options={paymentOptions}
                    selectedValue={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    inputClass="!outline-gray-300 checked:!bg-red-500 checked:!outline-red-500 "
                    className="text-lg"
                  />
                </div>
              </div>
            </div>
            <div className="flex2 w-full md:w-1/2 rounded-md border-2 h-fit max-h-fit text-lg">
              <div className="p-7">
                <div className="subtotal flex justify-between items-center my-3">
                  <span>Subtotal</span>
                  <span>{currencyFormat(subtotal)}</span>
                </div>

                <div className="DeliveryFee flex justify-between items-center my-3">
                  <span>Delivery Fee</span>
                  <span>{currencyFormat(deliveryFee)}</span>
                </div>
                <div className="VAT flex justify-between items-center my-3">
                  <span>V.A.T (7.5%)</span>
                  <span>{currencyFormat(tax)}</span>
                </div>

                <div className="Total flex justify-between items-center mt-10 mb-3">
                  <span className="font-bold">Total</span>
                  <span>{currencyFormat(total)}</span>
                </div>

                <Link to="/checkout" state={address}>
                  <ButtonCustom
                    name="Place Order"
                    buttonClass="bg-black text-white !px-8 !py-4 hover:!bg-black focus:!bg-black/80 focus:shadow-lg active:bg-black/80 active:shadow-lg text-sm normal-case w-full justify-center flex text-lg"
                    className="mt-7 w-full"
                    disabled={address && isObjectEmpty(address)}
                  />
                </Link>

                <p className="text-xs text-neutral-500 my-5">
                  If you’re not around when the delivery person arrives, they’ll
                  leave your order at the door. By placing your order, you agree
                  to take full responsibility for it once it’s delivered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
