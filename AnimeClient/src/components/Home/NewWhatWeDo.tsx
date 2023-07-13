import CurvedImages from "./CurvedImages";

export default function WhatWeDo() {
  return (
    <div className="w-full border-2">
      <div className="flex flex-wrap items-center justify-between w-screen h-full px-4 md:px-24 relative">
        <div className="md:w-1/2 z-50">

            <h2 className="text-8xl font-[Fujimaru] my-5">DEAR OTAKU</h2>

            <p className="text-lg w-1/2 whitespace-normal">Let us help you immerse yourself in your best anime fantasy. with our amazing array of anime cosplay products and merch. You can be anyone - or anything you want to be. </p>

            <p className="text-lg w-3/5 whitespace-normal">We summon you to live up to your Otaku identity, the clan awaits.</p>

        </div>
        <div className="absolute top-16 left-[50%] right-0 bottom-0 md:relative md:inset-0 w-1/2 h-full">
     {/* <div className=" absolute top-[60%] left-[61%] translate-x-[-50%] translate-y-[-50%]  h-[100px] w-[200px] rounded-tl-[150px] rounded-bl-[150px]   rounded-r-0 rounded-l-0 bg-red-500 ">
            

            </div>
            */}
            <CurvedImages/>
            

            
            

            
        </div>

        
      </div>
    </div>
  );
}


{/**position: absolute;
            top: 50%;
            left: 61%;
            transform: translate(-50%, -50%);
            transform: rotate(-90deg);
            height: 100px;
            width: 200px;
            border-radius: 150px 150px 0 0;
            background-color: red;*/}