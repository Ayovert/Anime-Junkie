import ButtonCustom from "../../shared/reuse/ButtonCustom";
import HeaderLogo from "./HeaderLogo";

export default function WhatWeDo2() {
  return (
    <div className="w-full h-full my-8 md:m-0 border-b-2 md:border-r border-black">

      <div className="hidden md:block">
      <HeaderLogo color="black"/>
      </div>
     
      <div className="flex flex-wrap items-center justify-between w-screen h-full px-4 md:pl-32 md:pr-40 relative">
      
        <div className="md:hidden my-4 mx-2">
          <span className="bg-red-100/50 text-xl text-red-500 font-bold mb-6 p-2 rounded-2xl">
            WHAT WE DO
          </span>
        </div>

        <div className="w-full h-full flex flex-col md:flex-row items-center justify-around">
          <div className="w-full h-1/2 md:w-6/12 items-center md:block">
            <div className="hidden md:inline-block w-full my-4 text-2xl">
              <span className=" bg-red-100/50 text-red-500 font-bold mb-6 p-3 rounded-2xl">
                WHAT WE DO
              </span>
            </div>

            <div className="my-6">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl my-4 font-[Fujimaru]">
                Any Merch you want,
              </h1>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl my-4 font-[Fujimaru]">
                From every Anime you watch
              </h1>

              <p className="text-sm text-slate-500 lg:text-lg w-3/5 md:w-3/4 whitespace-normal break-words">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                posuere sit amet arcu consectetur consectetur. In tincidunt
                ullamcorper interdum. Mauris dictum tortor in ultricies rutrut
              </p>

              <ButtonCustom
                name="Explore Now"
                className="my-14 !justify-start text-2xl"
                buttonClass="bg-red-500 px-5 !py-5 text-white"
              />
            </div>
          </div>

          <div className="w-full h-1/2 md:w-6/12 py-2  relative">
            <div className="h-full absolute -top-20 left-32 right-0  md:relative">
              <img
                src="/images/boku1.png"
                alt="banner-img"
                className="h-full md:h-[480px] lg:h-[600px] w-full object-contain"
              />
              <div
              className="w-40 md:w-52 absolute 
  left-[65%] 
  top-[30%]  md:top-[40%]
  right-0 bottom-0"
            >
              <img
                src="/images/whatCard.png"
                alt="card-img"
                className="h-[70%] md:h-full
                xl:h-72
                object-contain "
              />
            </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
