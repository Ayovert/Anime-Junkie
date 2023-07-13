import { ReactComponent as StarIcon } from "../../assets/images/icons/star.svg";
import Footer from "../../shared/layout/Footer";
import { ReactComponent as VisitShop } from "../../assets/images/icons/visitShop.svg";
import { Link } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";

const reviewCount = [1, 2, 3];
const stars = [1,2,3,4,5];

export default function Reviews() {
  return (
    <div className="w-full">
      
      
      <div className="w-full h-full md:w-screen md:overflow-x-hidden ">
      
        <div className=" bg-reviewHero bg-cover bg-center text-center text-white ">
          <div className="md:h-full flex flex-col">
          <div className="hidden md:block relative my-7 w-full">
      <HeaderLogo color="white"/>
        </div>
            <h1 className="font-[fujimaru] text-3xl md:text-8xl px-2 py-12 md:p-24">OTHER OTAKUS SAY</h1>
            <div className="flex flex-col md:flex-row flex-wrap w-full justify-between p-2 md:p-16 gap-y-8 md:gap-y-1  mb-6">
              {reviewCount.map((value) => {
                return (
                  <div
                    key={value}
                    className="flex flex-col justify-center items-center gap-y-2 md:gap-y-8 md:w-1/3 px-4"
                  >
                    <div className=" overflow-hidden rounded-full h-14 w-14 md:h-20 md:w-20">
                      <img
                        src="/images/gokuHero.png"
                        className=" h-full  object-cover bg-blue-100  ring-2 ring-white"
                        alt="circle-img"
                      />
                    </div>
                    <div className="flex md:flex-wrap  gap-x-2">
                      
                      <StarIcon className="h-5 w-5 md:h-8 md:w-8 fill-yellow-500" />
                      <StarIcon className="h-5 w-5 md:h-8 md:w-8  fill-yellow-500" />
                      <StarIcon className="h-5 w-5 md:h-8 md:w-8  fill-yellow-500" />
                      <StarIcon className="h-5 w-5 md:h-8 md:w-8  stroke-yellow-500 stroke-2" />
                      <StarIcon className="h-5 w-5 md:h-8 md:w-8  stroke-yellow-500 stroke-2" />
                    </div>

                    <p className="text-lg md:text-xl w-3/5 md-w-full text-center whitespace-normal">
                      Purchase your anime clothing and gift items affordable
                      prices.
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="h-1/5 pb-12">

          <Link to="/shop">
                    
                        <VisitShop className="h-16 hover:h-20 float-right"/>
                    
                    </Link>
                    </div>
          </div>

          
        </div>

        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
}
