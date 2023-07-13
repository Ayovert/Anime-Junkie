import { useState } from "react";
import CardLogo from "../../assets/images/icons/cardLogo";
import { useAppSelector } from "../../shared/redux/store";
import CustomRadioButton from "../../shared/reuse/CustomRadioButton";
import { currencyFormat, getCartTotal } from "../../shared/util/util";
import { paymentOptions } from "./checkoutData";

interface Props {
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ReviewForm({ selectedValue, onChange }: Props) {
  const { cart } = useAppSelector((state) => state.cart);

  const { subtotal, tax, deliveryFee, total} = getCartTotal(cart);
  return (
    <div className="md:w-3/5 my-5 px-5 md:p-10">
      <div className="MyItems my-3">
        <h3 className="font-[Fujimaru] mb-5 text-2xl text-center">Review your Order</h3>

        {cart && (
          <>
            {cart.items.map((item) => (
              <div
                className=" flex w-full justify-between items-center my-4"
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
                  </div>
                </div>
                <span className="price">{currencyFormat(item.price)} </span>
              </div>
            ))}

            <div className="flex flex-col md:flex-row flex-wrap ">
            <div className="Payment my-7 md:w-1/2 p-5">
              <h3 className="font-[Fujimaru] text-2xl">Payment</h3>
              <div className="my-2">
                <CustomRadioButton
                  options={paymentOptions}
                  selectedValue={selectedValue}
                  onChange={onChange}
                  inputClass="!outline-gray-300 checked:!bg-red-500 checked:!outline-red-500"
                />
              </div>
            </div>

            {/**Cart summary */}

            <div className="flex md:w-1/2 rounded-md bg-[#FFF0EB] h-fit max-h-fit p-7">
            <div className="">
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

              <p className="text-xs text-neutral-500 my-5">
                If you’re not around when the delivery person arrives, they’ll
                leave your order at the door. By placing your order, you agree
                to take full responsibility for it once it’s delivered.
              </p>
            </div>
          </div>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
}
