import { Transition, Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import e from "express";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, FormProvider, useForm, useFormContext, UseFormReturn } from "react-hook-form";
import agent from "../../shared/api/agent";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomAppCheckbox from "../../shared/reuse/CustomAppCheckbox";
import CustomTextInput from "../../shared/reuse/CustomTextInput";
import { validationSchema } from "./checkoutValidation";
import { getAddress } from "./getAddress";

interface Props {
  closeAddress: () => void;
  showAddress: boolean;
  submitDisabled: boolean;
  saveAddress: (data: FieldValues) => void;
}
export default function AddressForm2({
  closeAddress,
  showAddress,
  submitDisabled,
  saveAddress

}: Props) {

  const cancelButtonRef = useRef(null);

  const { control, formState, handleSubmit } = useFormContext();

  


 

  return (
    <Transition.Root show={showAddress} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={closeAddress}
      >

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <form className="w-full flex flex-col justify-center"  onSubmit={handleSubmit(saveAddress)}>
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/** */}
                  <div className="w-full p-5 md:p-10 my-5">
                    <h6 className="text-xl"> Shipping Address</h6>
                    <div className="flex flex-wrap flex-col m-5">
                      
                        <div className="w-full"
                        >
                          <CustomTextInput
                            name="fullName"
                            label="Full Name"
                            inputclass=""
                            control={control}
                          />
                        </div>
                        <div className="w-full">
                          <CustomTextInput
                            name="address1"
                            label="Address 1"
                            inputclass=""
                            control={control}
                          />
                        </div>

                        <div className="">
                          <CustomTextInput
                            name="address2"
                            label="Address 2"
                            control={control}
                          />
                        </div>
                        <div className="flex justify-between">
                          <div className="w-1/2 mr-4">
                            <CustomTextInput
                              name="city"
                              label="City"
                              control={control}
                            />
                          </div>
                          <div className="w-1/2 ml-4">
                            <CustomTextInput
                              name="state"
                              label="State/Province/Region"
                              control={control}
                            />
                          </div>
                        </div>

                        <div className="flex">
                          <div className="w-1/2 mr-4">
                            <CustomTextInput
                              name="postalCode"
                              label="Postal Code /Zip"
                              control={control}
                            />
                          </div>
                          <div className="w-1/2 ml-4">
                            <CustomTextInput
                              name="country"
                              label="Country"
                              control={control}
                            />
                          </div>
                        </div>

                        <div className="flex">
                          <div className="w-1/2 mr-4">
                            <CustomTextInput
                              name="telephone"
                              label="Telephone"
                              control={control}
                            />
                          </div>
                          <div className="w-1/2 ml-4">
                            <CustomTextInput
                              name="mobile"
                              label="Mobile"
                              control={control}
                            />
                          </div>
                        </div>

                        <div>
                          <CustomAppCheckbox
                            disabled={!formState.isDirty}
                            control={control}
                            label="Save this Address as default"
                            name="saveAddress"
                          />
                        </div>
                     
                    </div>
                  </div>

                  {/** */}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row float-right">
                  <ButtonCustom
                    name="Back"
                    buttonClass="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    className=""
                    onClick={() => closeAddress()}
                  />

                  <ButtonCustom
                    type="submit"
                    name="Save"
                    buttonClass="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    className=""
                    disabled={submitDisabled}
                    //onClick={saveAddress}
                  />
                </div>
              </Dialog.Panel>
              </form>
            </Transition.Child>
          </div>

        </div>
      </Dialog>
    </Transition.Root>
  );
}

