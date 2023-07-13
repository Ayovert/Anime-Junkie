import { Link } from "react-router-dom";
import ButtonCustom from "../../shared/reuse/ButtonCustom";

export default function NotFound()
{
    return(
        <div className="mx-40 my-20 h-[67vh]">
            <h3 className="text-xl my-4">
                Oops, we could not find what you are looking for</h3>
                <hr/>
                <Link to="/shop">
                
                <ButtonCustom
                    name="Go to Products"
                    buttonClass="bg-red-500 text-white !px-8 !py-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-lg normal-case"
                    className="mt-7"
                    
                  />
                </Link>

        </div>
    )
}