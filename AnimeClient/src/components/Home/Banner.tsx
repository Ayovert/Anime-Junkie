import ButtonCustom from "../../shared/reuse/ButtonCustom";

//w-100 h-[27rem]
export default function Banner() {
  return (
    <div className=" bg-hero1 bg-cover  px-8 lg:px-24 py-1 text-white md:bg-center bg-no-repeat flex justify-center items-center">
      <div className="flex flex-col mt-20 w-screen h-screen">
        <h1 className="text-5xl m-2 font-[Fujimaru]">Welcome to Anime Clans</h1>
        <p className="text-lg w-2/3 m-2">
          Purchase your anime clothing and gift items at affordable prices
        </p>

        <ButtonCustom
          name="Explore Now"
          className="my-7 ml-2  !justify-start"
          buttonClass="bg-white text-red-700 normal-case font-bold text-lg "
          textClass="p-3"
        />
      </div>
      <div className="flex w-1/2"></div>
    </div>
  );
}
