import { Transition, Dialog } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import e from "express";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import agent from "../../shared/api/agent";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomAppCheckbox from "../../shared/reuse/CustomAppCheckbox";
import CustomTextInput from "../../shared/reuse/CustomTextInput";
import { ReactComponent as StarIcon } from "../../assets/images/icons/star.svg";
import "./product.css";
import CustomInput from "../../shared/reuse/CustomInputField";
import { DisplayError } from "../Account/DIsplayError";
//import { validationSchema } from "./checkoutValidation";
//import { getAddress } from "./getAddress";
const stars = [1, 2, 3, 4, 5];
interface Props {
  closeReview: () => void;
  showReview: boolean;
  submitDisabled: boolean;
  saveReview: (data: FieldValues) => void;
}
export default function AddReviewForm({
  closeReview,
  showReview,
  submitDisabled,
  saveReview,
}: Props) {
  const cancelButtonRef = useRef(null);

  const {
    control,
    formState,
    handleSubmit,
    setValue,
    getFieldState,
    getValues,
  } = useFormContext();

  const [rating, setRating] = useState(-1);

  const ratingError = getFieldState("rating", formState);
  //form : rating + 1

  const ratingValue = getValues("rating");

  console.log(ratingError);

  console.log(formState.dirtyFields);

  function handleRating(index: number) {
    setRating(4 - index);

    setValue("rating", 4 - index + 1, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  /* useEffect(() => {
    setValue("rating", 0);
  },[setValue])*/

  return (
    <Transition.Root show={showReview} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={closeReview}
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
          <div className="reModal flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <form
                className="reviewForm w-full flex flex-col justify-center items-center"
                onSubmit={handleSubmit(saveReview)}
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    {/** */}
                    <div className="w-full p-5 md:p-10 my-5">
                      <h6 className="text-xl mb-8"> Review Form</h6>
                      <div className="flex flex-wrap flex-col m-5">
                        <div className="flex flex-col gap-y-2 mb-12 relative">
                          <h6 className="text-base">Rate this Product *</h6>

                          <div className="flex flex-wrap gap-x-3 ratingDiv">
                            {stars.map((_, index) => {
                              return (
                                <StarIcon
                                  key={index}
                                  className={`h-5 w-5 md:h-7
                                    
                                    rating${index}
                                    ${
                                      4 - index <= rating
                                        ? "fill-[#ffd700] transform-none"
                                        : ""
                                    }
                      md:w-7 fill-white  stroke-yellow-500 stroke-2
                      cursor-pointer
                      `}
                                  onClick={() => {
                                    handleRating(index);
                                  }}
                                />
                              );
                            })}
                            <div className="w-full ml-32 hidden">
                              <CustomTextInput
                                name="rating"
                                label="Rating"
                                type="number"
                                inputclass=""
                                control={control}
                              />
                            </div>
                            <span className="text-sm text-red-500 mt-2">
                              {!!ratingError.error && ratingError.error.message}
                            </span>
                          </div>
                        </div>

                        <div className="w-full">
                          <CustomTextInput
                            name="name"
                            label="Name"
                            inputclass=""
                            control={control}
                          />
                        </div>

                        <div className="">
                          <CustomTextInput
                            name="email"
                            label="Email Address"
                            control={control}
                          />
                        </div>

                        <div className="w-full">
                          <CustomTextInput
                            name="title"
                            label="Title"
                            inputclass=""
                            control={control}
                          />
                        </div>

                        <div className="w-full">
                          <CustomTextInput
                            description="true"
                            rows={4}
                            control={control}
                            name="userReview"
                            label="Review"
                            inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
                            placeholder="Description"
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
                      onClick={() => closeReview()}
                    />

                    <ButtonCustom
                      type="submit"
                      name="Save"
                      buttonClass="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      className=""
                      disabled={submitDisabled}
                      //onClick={saveReview}
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
