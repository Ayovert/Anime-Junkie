interface Props {
  curveClass?: string;
  className1?: string;
  className2?: string;
}
export default function CurvedImages({
  curveClass,
  className1,
  className2,
}: Props) {
  return (
    <div className={`w-full h-full mx-auto `}>
      <div
        className={`h-72 w-72 md:w-[32rem] md:h-[32rem] lg:w-[44rem] lg:h-[44rem]  relative -top-9 left-[50%]   md:top-[3.4rem] md:left-[50%] lg:left-[41%] xl:left-[55%] 2xl:left-[67%] 
        rounded-full border border-black  flex justify-center items-center ${curveClass}`}
      >
        <div className={`${className2}`}>

            {/**bottom-left */}
          <div id="img-1" className="curveItem overflow-hidden absolute left-20 -top-6 md:left-[19.4rem] md:-top-16 rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/gokuHero.png"
              className="curveItem h-full  object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img"
            />
          </div>
          <div id="img-2" className="curveItem overflow-hidden absolute left-44 -top-6
          md:left-[7rem] md:-top-10
          lg:left-[7rem] lg:-top-5 rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/gokuHero.png"
              className="curveItem h-full  object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img"
            />
          </div>

          <div id="img-3" className="curveItem left-[17rem] top-16 md:left-[-1rem] md:top-[6rem] overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className=" h-full w-18 object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>

          <div id="img-4" className="curveItem -left-4 top-16 md:left-[-7em] md:top-[17rem] overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className=" h-full w-18 object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>

          <div id="img-5" className="curveItem overflow-hidden -left-6 top-40 
          md:left-[1rem] md:top-[25.2rem] 
          lg:left-[-3rem] lg:top-[28rem]
          rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/gokuHero.png"
              className=" h-full  object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img"
            />
          </div>

          <div id="img-6" className="curveItem overflow-hidden left-[17.5rem] top-40 md:left-[9rem] md:top-[30rem] lg:left-[4rem] lg:top-[38rem]  rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/gokuHero.png"
              className=" h-full  object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img"
            />
          </div>

         

        

          <div id="img-7" className="curveItem left-60 bottom-4 md:left-[19.4rem] md:top-[30rem] lg:left-[19.4rem] lg:top-[44rem]  overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className=" h-full w-18 object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>


          <div id="img-8" className="curveItem left-60 bottom-4 md:left-[19.4rem] md:top-[30rem] lg:left-[34.4rem] lg:top-[38rem]  overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className=" h-full w-18 object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>

          <div id="img-9" className="curveItem left-60 bottom-4 md:left-[19.4rem] md:top-[30rem] lg:left-[41rem] lg:top-[30rem]  overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className=" h-full w-18 object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>

          <div id="img-10" className="curveItem left-60 bottom-4 md:left-[19.4rem] md:top-[30rem] lg:left-[43rem] lg:top-[18rem]  overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className=" h-full w-18 object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>

          <div id="img-11" className="curveItem left-60 bottom-4 md:left-[19.4rem] md:top-[30rem] lg:left-[40.5rem] lg:top-[7rem]  overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className=" h-full w-18 object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>

          <div id="img-12" className="curveItem left-60 bottom-4 md:left-[19.4rem] md:top-[30rem] lg:left-[32.5rem] lg:-top-4  overflow-hidden rounded-full h-8 w-8 md:h-20 md:w-20">
            <img
              src="/images/products/akatsukiShirt.png"
              className="h-full w-auto object-cover bg-blue-100  ring-2 ring-white"
              alt="circle-img-2"
            />
          </div>
        </div>

        {/**bottom-left */}
        {/**red circle */}

      <div
        className={`h-[16rem] md:h-[28rem] lg:h-[40rem]
             md:left-[0.6rem] relative left-1  ${className1}`}
      >
        <img
          src="/images/sharingan.png"
          alt="sharingan"
          className="h-full max-w-[40rem] "
        />
      </div>
      </div>

      

      {/*<div className="w-[30%] h-[30%] md:w-[80%] md:h-[80%] absolute top-[50%] right-[-85%] rounded-tl-full rounded-bl-full translate-x-[-50%] translate-y-[-50%] bg-red-800">



</div>
<div className="w-[20%] h-[20%] md:w-[60%] md:h-[60%] absolute top-[50%] right-[-70%] border border-r-0 border-white rounded-tl-full rounded-bl-full translate-x-[-60%] translate-y-[-50%] bg-red-700">



</div>
<div className="w-[10%] h-[10%] md:w-[36%] md:h-[36%] absolute top-[50%] right-[-40%]  rounded-tl-full rounded-bl-full translate-x-[-50%] translate-y-[-50%] bg-black"></div>*/}
    </div>
  );
}
