import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CurvedImages from "./CurvedImages";
import useProducts from "../../shared/hooks/useProducts";
import ProductCard from "../Shop/productCard";
import HeaderLogo from "./HeaderLogo";

export default function OurProducts() {
  const { categories, products } = useProducts();

  useEffect(() => {
    try {
      setCategory(categories[0]);
    } catch (error) {
      console.log(error);
    }
  }, [categories]);

  const [category, setCategory] = useState(categories[0]);

  //const { products, filtersLoaded, metaData } = useProducts();

  return (
    <div className="w-full relative">
      <div className="text-gray-700 flex flex-col items-center justify-center md:justify-between w-screen h-screen overflow-auto relative">
        <div className="hidden md:block relative my-7 w-full">
          <HeaderLogo color="black" />
        </div>
        {/*<div className="w-5/12 hidden h-full absolute md:sticky top-0 bottom-0 right-0 left-0"> 
           
           <CurvedImages curveClass="hidden md:hidden rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full -scale-x-100 scale-y-100 absolute -left-[22rem] !top-[3.5rem] md:!left-[-21rem]" className1="-scale-x-100 scale-y-100 relative top-[1.9rem] !left-[-2.2rem]" className2="curveImage scale-x-100 scale-y-100 absolute left-4"/>
          </div>*/}
        <div className="flex flex-col justify-center items-center w-full md:my-14 relative">

          <div className="flex flex-col items-center justify-center mb-8"> 
          <h3 className="text-2xl md:text-8xl font-[Fujimaru] ">
            OUR BESTSELLER
          </h3>

          <p className="text-xl">Check out some of our highly rated merch</p>
          </div>
          

          <div className="my-4">
            <ul className="flex">
              {categories.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => setCategory(item)}
                    className={`mr-12 text-xl  p-2 cursor-pointer  ${
                      category === item
                        ? "border-b-2 text-red-500 border-red-500"
                        : ""
                    } ${index === categories.length - 1 ? "mr-0" : ""}`}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="container px-20 md:px-5 pt-12 mx-auto lg:pt-12 lg:px-14 md:mt-16 overflow-auto">
            <div className="flex md:flex-wrap -m-1 md:-m-2 md:justify-center items-center">
              {/**Card  
               */}
              {products.filter((item => item.category === category)).slice(0,5).map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    product={product}
                    length={products.length}
                    cardClass="!mx-4 !mt-16"
                  />
                );
              })}
              {/**Card */}
            </div>
          </div>
          <Link to="/shop">
            <ButtonCustom
              name="See More"
              buttonClass="bg-red-500 text-white !px-3 !py-3 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-lg"
              className="w-full mb-8"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
