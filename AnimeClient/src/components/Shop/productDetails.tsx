import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../shared/data";
import LoadingComponent2 from "../../shared/reuse/LoadingComponent2";
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { addCartItemAsync, removeCartItemAsync } from "../Cart/cartSlice";
import NotFound from "../Error/NotFound";
import { productSelectors, fetchProductAsync } from "./productSlice";
import ProductCard from "./productCard";
import useProducts from "../../shared/hooks/useProducts";
import { ReactComponent as StarIcon } from "../../assets/images/icons/star.svg";
import AddReviewForm from "./AddReviewForm";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { reviewValidationSchema } from "./reviewValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Product, productImages } from "../../shared/model/product";
import agent from "../../shared/api/agent";
import { Review } from "../../shared/model/review";

const images = [1, 2, 3];

const stars = [1, 2, 3, 4, 5];

export default function ProductDetails() {
  const currentValidationSchema = reviewValidationSchema;

  //methods: UseFormReturn<FieldValues, any>
  
  const mountedRef = useRef(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart } = useAppSelector((state) => state.cart);
  const { id } = useParams<{ id: string }>();

  const oid = parseInt(id!);

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationSchema),
  });

  // const product = useAppSelector((state) =>
  //  productSelectors.selectById(state, oid)
  //);

  const { status: productStatus } = useAppSelector((state) => state.product);

  const { products } = useProducts();

 // const product = products.find((p) => p.id === oid);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, oid)
  );

  const [quantity, setQuantity] = useState(0);
  const item = cart?.items.find((i) => i.productId === oid);

  const [showReview, setShowReview] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);

  const [images, setImages] = useState<productImages[]>();

  console.log(images);



  function submitDisabled(): boolean {
    return !methods.formState.isValid;
  }

  const getImages = useCallback(async() => {
    await agent.Image.getImage(oid)
    .then((response) => {
      setImages(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },[oid])

  const getReviews = useCallback(async() => {
    await agent.Review.get()
    .then((response) => {
      setReviews(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },[])
   
  

console.log(reviews);

  useEffect(() => {
    try {
     if(!images){
      getImages();
     }

     getReviews();
      
      setShowReview(false);
      return () => {
        mountedRef.current = false;
      };
    } catch (error) {
      console.log(error);
    }
  }, [getImages, images, getReviews]);

  function closeReview() {
    setShowReview(false);
  }

  function openReview() {
    setShowReview(true);
  }


 const saveReview = async(data: FieldValues) =>{
    try{
      console.log(data);
      await agent.Review.post(data);
      closeReview();
    }
    catch(error){
      console.log(error);
    }
   
    

     //console.log(data);
   
  };

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;

      dispatch(
        addCartItemAsync({ productId: product?.id!, quantity: updatedQuantity })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;

      dispatch(
        removeCartItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    if (!product){
       dispatch(fetchProductAsync(oid))
      } else{
        setImages(product.images);
      }
      
      ;

    return () => {
      mountedRef.current = false;
    };
  }, [dispatch, product, item, oid]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(event.target.value);
    }
  }

  if (productStatus.includes("pending"))
    return <LoadingComponent2 message="Loading Product ..." />;

  if (!product) return <NotFound />;

  return (
    <>
      <div className="m-0 my-24">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="relative cursor-pointer lg:mx-3 xl:mx-52"
        >
          <span className="text-xl bg-slate-100 font-bold mb-6 p-3 rounded-xl my-6 mx-2 
          absolute
          left-2 lg:-left-58 lg:-top-2">
            {`< Back`}{" "}
          </span>
        </div>

        {/**product images */}
        <div className="m-10 md:mt-24 md:mb-48 lg:mx-3 xl:mx-52 p-3 flex flex-wrap flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-around w-full md:w-6/12">
            <div className="hidden md:flex flex-col w-4/12">
              {images && images.length > 0 &&
                images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className={`mb-9 p-2 h-28 w-28  rounded-lg   flex items-center justify-center ${
                        index === 0 ? " border-2 border-red-400" : ""
                      }`}
                    >
                      <img
                        src={image.pictureUrl}
                        alt="product"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  );
                })}
            </div>

            <div className="w-full md:w-8/12">
              <img
                src={product
                    ? product.pictureUrl
                    : ""
                }
                alt="product"
                className="h-auto"
              />
            </div>
          </div>

          <div className="w-full md:w-5/12 my-8">
            <h1 className="text-5xl my-6 font-bold">{product.name}</h1>
            <p className="text-lg opacity-60 font-thin  md:w-2/3 my-2">
              A detailed description of your product image, or a brief
              description of your product video.
            </p>
            <p className="text-5xl my-4">
              {" "}
              <span className="line-through">N</span>
              {product.price}
            </p>

            <ButtonCustom
              name="Add to Cart"
              className="my-6 "
              buttonClass={`bg-red-500 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-white flex justify-between  !px-9 !py-6`}
              onClick={() => {
                dispatch(addCartItemAsync({ productId: product.id }));
              }}
            />
          </div>
        </div>
        {/**End of product images */}

        {/**Reviews flex */}
        <div
          className="flex flex-col lg:flex-row flex-auto w-full px-8 py-9 md:px-28 gap-x-32 justify-around items-center   
        border-t-8
        border-b-8"
        >
          <div className="w-full lg:w-1/5">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-wrap gap-x-3">
                {stars.map((_, index) => {
                  return (
                    <StarIcon
                      key={index}
                      className={`h-5 w-5 md:h-8 md:w-8  ${reviews.length > 0 ? "fill-yellow-500" : "stroke-yellow-500 fill-white"}`}
                    />
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-x-28 items-center">
                <span className="text-2xl">{reviews.length ?? 5.0}</span>
                <span className=""> {reviews.length} reviews</span>
              </div>

              <FormProvider {...methods}>

              <h4
               
                className="no-underline hover:underline text-blue-600 text-xl cursor-pointer"
                onClick={() => openReview()}
              >
                Add a review
              </h4>
              {showReview && (
            <AddReviewForm
              closeReview={closeReview}
              showReview={showReview}
              submitDisabled={submitDisabled()}
              saveReview={saveReview}
            />
          )}
          </FormProvider>
            </div>
          </div>

          {/**Reviews */}
          <div className="w-full lg:w-4/5 flex">
          <div className="w-full  flex flex-col lg:flex-row flex-auto items-center justify-center gap-x-8">
                
                <span className="text-3xl rotate-90 lg:rotate-0 text-black/80 cursor-pointer"> <img alt="prev arrow" src="/images/prevArrow.png" className="h-6"/> </span>
            {reviews && reviews.length > 0 ? (
              

<div className="flex flex-wrap flex-auto justify-center items-center w-5/6">
  {/**review card */}

  {reviews.map((review, index) => {
    return (
      <div
        className="w-full flex flex-col items-center justify-center lg:w-1/3"
        key={index}
      >
        {/**avatar */}
        <div className="flex items-center gap-x-6">
          <div className="my-4 items-center overflow-hidden">
            <img
              className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl ml-2">{review.name}</span>
            <div className="flex flex-wrap gap-x-3 my-2">
              {stars.map((_, index) => {
                return (
                  <StarIcon
                    key={index}

                    className={`h-6 w-6 fill-yellow-500`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/**end of avatar */}

        {/**Review message */}
        <p className="w-3/5 text-black/60">
          {review.userReview}
        </p>
        {/**End of  Review message */}
      </div>
    );
  })}
</div>


               
            ) : (
              <div className="w-full flex flex-col flex-auto items-center justify-center">
                <img alt="empty review" src="/images/emptyStar.png" className="h-16"/>

                <p className="">
                No Reviews yet, be the first to 
                <span className="text-blue-500 underline ml-1 cursor-pointer">add a review</span>
                </p>

                </div>
            )

            }
            <span className="text-3xl rotate-90 lg:rotate-0 text-black/80 cursor-pointer"> <img alt="next arrow" src="/images/nextArrow.png" className="h-6"/></span>
              </div>
           
          </div>
          {/** End of Reviews */}
        </div>
        {/**End of Reviews flex */}

        {/**You may also like */}
        <div className="flex w-full justify-center items-center md:px-12">
          <div className="w-full">
            <p className="text-xl mx-16 my-6 opacity-40">You may also like</p>
            <div className="flex flex-wrap gap-x-12 md:items-center justify-center px-6 md:p-0">
              {/**Card */}
              {products.slice(0, 4).map((product, index) => {
                return (
                  <ProductCard
                    length={products.length}
                    key={index}
                    product={product}
                    cardClass="mt-12 grow md:grow-0 basis-5/12 md:!basis-1/3 lg:!basis-1/5 "
                  />
                );
              })}
              {/**Card */}
            </div>
          </div>
        </div>

        {/**You may also like */}
      </div>
    </>
  );
}
