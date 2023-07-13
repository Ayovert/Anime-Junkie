import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import AppSelectList from "../../shared/reuse/AppSelectList";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomTextInput from "../../shared/reuse/CustomTextInput";
import { preOrderValidationSchema } from "./reviewValidation";

import { useEffect, useRef, useState } from "react";

import ColorPicker from "../../shared/reuse/ColorPIcker";
import SketchDropzone from "../../shared/reuse/SketchDropzone";
import agent from "../../shared/api/agent";
import { toast } from "react-toastify";
import { RGBAToHexA } from "../../shared/util/util";
import useProducts from "../../shared/hooks/useProducts";
import { materials } from "../../shared/util/data";

export default function PreOrder() {
  const validationSchema = preOrderValidationSchema;
  const { categories, animes } = useProducts();

 

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });


  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isDirty, isSubmitting, isValid },
  } = methods;

  console.log()
  const mountedRef = useRef(true);
  const watchFile = watch("conceptSketch", null);
  const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });

  const materialColor = getValues("materialColor");

  console.log(materialColor);

  function handleChange(color: any) {
    setColor(color);
    setValue("materialColor", `#${RGBAToHexA(color)}`, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    setValue("materialColor", `#000000`)
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [materialColor, watchFile, setValue]);

  async function submitOrder(data: FieldValues) {
    await agent.Cart.addSpecialOrder(data)
      .then(() => {
        toast.success("PreOrder Created");
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <FormProvider {...methods}>

   
    <div className="py-28 px-10 md:px-20">
      <form className="xl:mx-56" onSubmit={handleSubmit(submitOrder)}>
        <h2 className="text-4xl font-[Rakkas] mb-10">Pre-Order Anime Merch</h2>
        <div className="flex flex-wrap md:m-5">
          <div className="w-full sm:w-1/2 sm:pr-8">
            <h3 className="text-lg mb-3 font-medium">Type of Merch</h3>
            <AppSelectList
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              items={categories}
              control={control}
              name="merchType"
              label="Select a Merch Type"
            />
          </div>

          <div className="w-full sm:w-1/2 sm:pl-8">
            <h3 className="text-lg mb-3 font-medium">Text on Merch</h3>
            <CustomTextInput
              control={control}
              name="merchText"
              label="What to write on your Merch"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="What to write on your Merch"
            />
          </div>

          <div className="w-full sm:w-1/2 sm:pr-8  mb-10">
            <h3 className="text-lg mb-3 font-medium">Material Type</h3>
            <AppSelectList
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              items={materials}
              control={control}
              name="materialType"
              label="Select a Material Type"
            />
          </div>

          <div className="w-full sm:w-1/2  mb-10 sm:pl-8">
            <h3 className={`text-lg mb-3 font-medium`}>Material Color</h3>
            <div className="w-full ml-32 hidden">
              <CustomTextInput
                name="materialColor"
                label="Material Color"
                inputclass=""
                control={control}
                defaultValue="#000000"
              />
            </div>

            <div className="">
              <ColorPicker handleChange={handleChange} color={color} />
            </div>
          </div>

          <div className="w-full">
            <div className="w-1/3">
            <CustomTextInput
              type="number"
              control={control}
              name="quantity"
              label="Quantity"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="Quantity"
            />
            </div>
            
          </div>

          <div className="w-full sm:w-1/2 sm:pr-8  mb-10">
            <h3 className="text-lg mb-3 font-medium">Anime Theme</h3>

            <CustomTextInput
              control={control}
              name="animeTheme"
              label="Anime Theme of your Merch"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="Anime Theme of your Merch"
            />
          </div>

          <div className="w-full sm:w-1/2  mb-10 sm:pl-8 ">
            <h3 className="text-lg mb-3 font-medium">Sketch of Concept</h3>

            <div className="flex flex-col justify-center items-center relative">
              <SketchDropzone control={control} name="conceptSketch" class="" />

              <div
                className={`${
                  watchFile ? "h-full m-2 md:absolute inset-0 top-9" : ""
                }`}
              >
                {watchFile && (
                  <img src={watchFile.preview} alt="preview" className="h-60" />
                )}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 ">
            <h3 className="text-lg mb-3 font-medium">Concept Description</h3>
            <CustomTextInput
              description="true"
              rows={4}
              control={control}
              name="description"
              label="Describe your order in details"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="Description"
            />
          </div>

          <div className="flex justify-end mt-8 mr-12 w-full">
            <ButtonCustom
              loading={isSubmitting}
              disabled={!methods.formState.isValid}
              type="submit"
              //variant='contained' color='success'
              className="text-green-300 p-4 float-right"
              buttonClass={` ${`bg-black hover:!bg-black/80 focus:!bg-black/80 focus:shadow-lg active:bg-black/80 active:shadow-lg  text-white`} flex justify-between text-lg !p-5`}
              name="Send Order"
            />
          </div>
        </div>
      </form>
    </div>
    </FormProvider>
  );
}
