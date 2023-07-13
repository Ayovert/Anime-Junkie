import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import agent from "../../shared/api/agent";
import useProducts from "../../shared/hooks/useProducts";
import { Product, productImages } from "../../shared/model/product";
import { useAppDispatch } from "../../shared/redux/store";
import AppDropzone from "../../shared/reuse/AppDropZone";
import AppSelectList from "../../shared/reuse/AppSelectList";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomTextInput from "../../shared/reuse/CustomTextInput";

import { setProduct } from "../Shop/productSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./productValidation";
import AppDropzone2 from "../../shared/reuse/AppDropZone2";

import './Inventory.css';

interface Props {
  product?: Product;
  cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
  //
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const { categories } = useProducts();
  const watchFile = watch("file", null);
  const watchFiles = watch("files", []);
  
  const dispatch = useAppDispatch();

  const [images, setImages] = useState<productImages[]>();


  const getImages = useCallback(async() => {
    await agent.Image.getImage(product!.id)
    .then((response) => {
      setImages(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },[product])
  

  useEffect(() => {
    if (product && !watchFile && !isDirty && (!watchFiles || watchFiles.length < 1)){
      console.log("reset");

    getImages();
      reset(product);
    }
      
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
      if (watchFiles && watchFiles.length > 0) {
        watchFiles.forEach((watchFile: any) => {
          URL.revokeObjectURL(watchFile.preview);
        });
      }
    };
  }, [product, reset, watchFile, isDirty, watchFiles]);

  async function deleteImage(productId:number, publicId: string){
    await agent.Image.deleteImage(publicId)
    .then((response) => {
      if(product){
        reset(product);
        setImages(response);
      }
      
    })
    .catch((error) => {
      console.log(error);
      cancelEdit();
     
    })
    ;
  }

  async function handleSubmitData(data: FieldValues) {

    try {
      let response: Product;
      if (product) {
        response = await agent.Admin.updateProduct(data);
      } else {
        response = await agent.Admin.createProduct(data);
      }
      dispatch(setProduct(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" w-full ">
      
      <div className="w-full  rounded-sm p-4 my-5 md:my-20 xl:px-80 bg-white ">
      <h4 className="mb-4 text-xl">Product Details</h4>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="flex flex-wrap my-20">
          <div className="w-full">
            <CustomTextInput
              control={control}
              name="name"
              label="Product name"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="Product name"
            />
          </div>
          <div className="w-full mb-10">
            <AppSelectList
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              items={categories}
              control={control}
              name="category"
              label="Category"
            />
          </div>

          <div className="sm:w-1/2 pr-8">
            <CustomTextInput
              type="number"
              control={control}
              name="price"
              label="Price"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="Price"
            />
          </div>
          <div className="sm:w-1/2 sm:pl-8">
            <CustomTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="Quantity in Stock"
            />
          </div>
          <div className="w-full">
            <CustomTextInput
              description="true"
              rows={4}
              control={control}
              name="description"
              label="Description"
              inputclass="!border !border-gray-300 focus:!bg-white focus:!border-blue-600 focus:!outline-none"
              placeholder="Description"
            />
          </div>
          <div className="w-full">
            {/**Main Image */}
            <div className="flex justify-between items-center">
              <AppDropzone2 control={control} name="file" class="w-5/12 m-2" />
              <div className={`${watchFile ? "w-5/12 h-full m-2" : ""}`}>
                {watchFile ? (
                  <img
                    src={watchFile.preview}
                    alt="preview"
                    style={{ height: "100%", maxHeight: 200 }}
                  />

                ) : (
                  <img
                    src={product?.pictureUrl}
                    alt={product?.name}
                    style={{ maxHeight: 200 }}
                  />
                )}
              </div>
            </div>
            {/**Main Image */}


            {/**Other Images */}
            <div className="flex items-center justify-between ">
              <AppDropzone
                control={control}
                name="files"
                class="w-5/12 m-2"
                multiple={true}
              />
              <div className={`flex flex-wrap w-5/12 m-2`}>
                {watchFiles ? watchFiles.length > 0 ? (
                  watchFiles.map((watchFile: any, index: number) => {
                    console.log("show files");
                    return (
                      <img
                        key={index}
                        src={watchFile.preview}
                        alt="preview"
                        className="h-24 m-2 max-h-52"
                      />
                    );
                  })
                ) : (
                  <></>
                ) : 
                (
                  <></>
                )}
              </div>
            </div>
            <div
              className={`${images &&
                images.length > 0
                  ? "flex flex-wrap w-5/12 m-2 justify-center"
                  : ""
              }`}
            >
              {images &&
                images.length > 0 &&
                images.map((image, index) => {
                  return (
                    <div key={index} className="relative miniImages">
                       <img
                      src={image.pictureUrl}
                      alt={image.publicId}
                      className="h-24 m-2 max-h-52"
                    />
                    <span className="text-red-500 bg-slate-300/70 hover:bg-slate-500 px-3 pb-1 rounded-lg text-3xl hidden items-center justify-center w-10 h-9 cursor-pointer absolute top-0 right-0"
                    onClick={() => deleteImage(image.productId,image.publicId)}
                    >x</span>
                    </div>
                   
                  );
                })}
            </div>

            {/**Other Images */}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <ButtonCustom
            onClick={cancelEdit}
            //variant='contained' color='inherit'
            className="text-inherit"
            buttonClass={` ${`bg-gray-300 hover:!bg-gray-400 focus:!bg-gray-400 focus:shadow-lg active:bg-gray-500 active:shadow-lg text-black `} flex justify-between`}
            name="Cancel"
          />
          <ButtonCustom
            loading={isSubmitting}
            type="submit" 
            //variant='contained' color='success'
            className="text-green-300"
            buttonClass={` ${`bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-900 active:shadow-lg  text-white`} flex justify-between`}
            name="Submit"
          />
        </div>
      </form>
      </div>
    </div>
  );
}
