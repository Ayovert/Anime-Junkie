import { Link } from "react-router-dom";
import ButtonCustom from "../../shared/reuse/ButtonCustom";

export default function ErrorPage() {
  return (
    <>
      <div className="mx-40 my-20 h-80">
        <h3 className="text-xl my-6">
          Oops, sorry. There was a problem communicating with our servers
        </h3>

        <Link to="/">
          {" "}
          <ButtonCustom
            name="Go Home"
            buttonClass="bg-red-500 text-white !px-8 !py-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-sm normal-case w-full justify-center"
            className="mt-12 w-1/3"
          />
        </Link>
      </div>
    </>
  );
}
