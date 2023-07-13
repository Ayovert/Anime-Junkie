import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../shared/redux/store";

import ButtonCustom from "../../shared/reuse/ButtonCustom";
import Search from "../../shared/reuse/SearchBar";
import ProductCard from "../Shop/productCard";
import useProducts from "../../shared/hooks/useProducts";
import { useEffect, useRef, useState } from "react";
import Home from "./NewHome";
import { setProductParams } from "../Shop/productSlice";
import { animeCards } from "../../shared/util/data";


interface Props {
  sideBarstate: boolean;
  handleSidebar: (state: boolean) => void;
}

export default function Home2({ sideBarstate, handleSidebar }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categories, products, productParams } = useProducts();

  const [animeItems, setAnimeItems] = useState(productParams.animes || []);

  function handleChecked(value: string) {
    const currentIndex = animeItems.findIndex((item) => item === value);

    let newChecked: string[] = [];
    if (currentIndex === -1) {
      newChecked = [...animeItems, value];
    } else {
      newChecked = animeItems.filter((item) => item !== value);
    }
    setAnimeItems(newChecked);
    dispatch(setProductParams({ animes: newChecked}))

    navigate("/shop");
  }

  //['Bleach', 'Naruto', 'Boku No Hero', 'Misc', 'One Piece', 'Demon Slayer']

  

  return (
    <div className="relative">
      <div className="h-full ">
        {/**Landing page 
        <div className="flex flex-wrap items-center justify-between w-screen lg:h-screen px-8 
        
        lg:pl-16 xl:pl-32 relative mt-12 mb-16 ">
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-full lg:w-5/12 items-center md:block">
              <div className="my-6">
                <h1 className="text-5xl my-4 font-[Rakkas]">
                  Any Merch you want,
                </h1>
                <h1 className="text-5xl my-4 font-[Rakkas]">
                  From every Anime you watch
                </h1>

                <p className="text-slate-500 w-3/5 md:w-3/4 whitespace-normal break-words text-xl">
                  Purchase your anime clothing and gift items affordable prices.
                </p>

                <div className="flex items-center mt-8 md:w-3/4 -ml-2">
                  <Search />
                </div>
              </div>
            </div>

            <div className="w-full lg:h-[80rem] lg:w-7/12 py-2 lg:relative top-0 left-36">
              <div className="h-full  -z-10">
                <img
                  src="/images/pictureGroup.png"
                  alt="banner-img"
                  className="h-full object-contain xl:object-none"
                />
               
              </div>
            </div>
          </div>
        </div>

        {/**End of landing page */}

        <Home sideBarstate={sideBarstate} handleSidebar={handleSidebar} />

        {/**Best seller */}

        <div className="w-full flex justify-center">
          <div className="container pt-12 md:px-6 lg:mx-16 lg:pt-12 md:mt-16">
            <h4 className="text-2xl ml-4">BEST SELLERS</h4>

            <div className="flex flex-wrap w-full px-1 md:-m-2 justify-center items-center">
              {/**Card
               */}
              {products.slice(0, 4).map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    product={product}
                    length={products.length}
                    cardClass="!mt-16 mx-4"
                  />
                );
              })}
              {/**Card */}
            </div>

            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 float-right px-4 md:mr-10 lg:mr-20">
              <ButtonCustom
                name="View More Products"
                className="my-6 md:justify-end "
                buttonClass="bg-black px-5 py-5 text-white hover:!bg-black/70 normal-case !text-lg w-full"
                textClass="text-center justify-center whitespace-nowrap"
              />
            </div>
          </div>
        </div>

        {/**End of Best seller */}

        {/**Be the otaku you dreamed of */}

        <div className="bg-black text-center text-white flex flex-col items-center py-28 font-[Lato]">
          <div className="flex justify-center items-center mb-4">
            <img
              src="/images/kimetsuHead3.png"
              className="h-16"
              alt="loader-img1"
            />
          </div>
          <h3 className="text-5xl font-[Rakkas] py-8">
            Be the otaku you've always dreamed of
          </h3>

          <p className="text-lg text-center lg:w-1/3">
            Let us help you immerse yourself in your best anime fantasy. with
            our amazing array of anime cosplay products and merch. You can be
            anyone - or anything you want to be.{" "}
          </p>

          <p className="my-6 text-lg">
            We summon you to live up to your Otaku identity, the clan awaits.
          </p>

          {/**Cards flex */}
          <div className="flex flex-wrap lg:gap-x-12 mt-20 justify-center">
            {animeCards.map(({ anime, bgColor, textColor, image }, index) => {
              return (
                <div
                  key={index}
                  className={`relative h-80 xl:h-96 2xl:h-[32rem] border 
                
                rounded-lg lg:rounded-xl mx-4 lg:mx-2 my-2 ${
                  index === 0 || index === 3 ? "lg:-top-48" : ""
                }`}
                >
                  {/**text and button */}
                  <div className="img-overlay absolute inset-0 bg-black/60 h-full flex flex-col items-center justify-center rounded-lg lg:rounded-xl ">
                    <h2 className={` text-xl h-16 ${textColor}`}>{anime.toUpperCase()}</h2>
                   
                      <ButtonCustom
                        name="View Products"
                        className="my-6 w-full  justify-center"
                        buttonClass={`${bgColor} hover:!${bgColor} lg:px-5 lg:py-5 text-black  normal-case w-3/4 h-16`}
                        textClass="justify-center text-base lg:text-lg whitespace-nowrap"
                        onClick={() => handleChecked(anime)}
                      />
                
                  </div>

                  {/**end of text and button */}

                  <img src={image} alt="aotCard" className="h-full" />
                </div>
              );
            })}
          </div>

          {/**Ends of Cards flex */}
        </div>
        {/**End of Be the otaku you dreamed of */}

        {/**Customer orders */}

        <div className="flex flex-col items-center text-center text-black py-32 relative overflow-hidden ">
          <div
            className="flex justify-center items-center mb-4 absolute -left-24  -top-24 lg:-top-0.5 bottom-0 lg:-left-72
        -scale-x-100  h-56 lg:h-full opacity-75"
          >
            <img
              src="/images/sharinganBlack.png"
              className="h-full"
              alt="sharingan Black"
            />
          </div>

          <div className="flex justify-center items-center mb-4 h-56 lg:h-full absolute -bottom-28  -right-24 lg:-top-0.5 lg:bottom-0 lg:-right-72 opacity-75  ">
            <img
              src="/images/sharinganBlack.png"
              className="h-full"
              alt="sharingan Black"
            />
          </div>
          <h3 className="text-2xl mb-12">CUSTOM ORDERS</h3>

          <h3 className="text-3xl font-[Rakkas]">
            Make your imaginations a reality
          </h3>

          <p className="text-xl mt-4 px-12 lg:px-0 lg:w-1/3">
            From well crafted imaginations to perfectly delivered products, take
            your love for animes up a notch by requesting for a custom order.
          </p>

          {/**Custom order field */}

          <div className="flex justify-center items-center relative w-full lg:w-1/2 px-8 lg:px-0 mt-10 ">
            <div className="input-group relative flex flex-wrap items-center w-full rounded-2xl overflow-hidden justify-center">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full pr-2 pl-8 py-4 text-base font-normal text-gray-700 bg-slate-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none rounded-lg ml-2"
                placeholder="Put in custom order request"
                aria-label="Search"
                aria-describedby="button-addon2"
              />

              <h4 className="lg:text-lg md:absolute md:right-1 lg:-top-2.5 md:p-2 lg:px-4 lg:py-2.5 text-white bg-black rounded-lg md:w-1/2 whitespace-nowrap ml-2 px-8 py-3 my-4 w-full">
                Create Custom Order
              </h4>
            </div>
          </div>

          {/**Custom order fielde */}
        </div>

        {/**End of Customer orders */}
      </div>
    </div>
  );
}
