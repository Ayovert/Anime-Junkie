import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { categories } from "../../shared/util/data";

export default function ShopByCategories() {
  return (
    <div className="bg-[#D7646A]">
      <div className=" flex flex-wrap justify-center items-center  px-10 py-14 m-0 lg:mx-8 xl:mx-36">
        <div className="text-white w-full lg:w-2/5">
          <h3 className="text-xl mx-2 font-bold mb-10">
            <span className="bg-red-100/40 rounded-3xl p-3">Categories</span>
          </h3>

          <div className="CategoryBox">
            <h1 className="text-5xl my-4 mx-2 font-[Fujimaru]">
              Shop by categories
            </h1>

            <p className="text-xl w-full m-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              posuere sit amet arcu consectetur consectetur. In tincidunt
              ullamcorper interdum. Mauris dictum tortor in ultricies rutrut
            </p>
          </div>

          <ButtonCustom
            name="Explore Now"
            className="my-14 ml-2 "
            buttonClass="border border-white px-5 py-5 text-white hover:bg-red-500 normal-case !text-lg"
          />
        </div>

        <div className="container w-max p-0 md:px-5 md:py-2 lg:pt-6 lg:px-6 lg:w-3/5">
          <div className="flex flex-wrap -m-1 md:-m-10 justify-center items-center">
            {/**Card */}
            {categories.map((values, index) => {
              return (
                <div
                  className="flex flex-wrap flex-col w-3/4 md:w-1/3 rounded-lg shadow-lg bg-white max-w-sm m-6 py-6 px-4 border-2 "
                  key={index}
                >
                  <div className="w-full p-1 md:p-2 flex justify-center ">
                    <a
                      href="#!"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        className="rounded-t-lg block object-contain object-center px-5 py-1 h-24"
                        src={values.icon}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="w-full flex flex-col items-center justify-center">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                      {values.title}
                    </h5>
                    <p className="text-gray-700 text-sm mb-4">
                      {values.Quantity} Merch
                    </p>
                  </div>
                </div>
              );
            })}
            {/**Card */}
          </div>
        </div>
      </div>
    </div>
  );
}
