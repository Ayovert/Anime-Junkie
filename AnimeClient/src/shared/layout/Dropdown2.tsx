import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon";
import { Link } from "react-router-dom";

const shopItems = [
    "Clothes",
    "Accessories",
    "Home Items",
    "Cosplay",
    "Figurines",
    "Fragrance",
    "Decoratives",
  ];

export default function Dropdown2(){
    return(
        <div className="relative">
        <button className="peer py-2"><Link to="shop">
                  <div className="inline-flex items-center justify-center space-x-2 px-2  w-full">
                    <h4 className="">Shop</h4>

                    <ChevronDownIcon
                      className={`
                    ml-2 h-8 w-8 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                      aria-hidden="true"
                    />
                  </div>
                </Link></button>
        
       {/* <!-- the menu here -->*/}

       <div className="absolute z-10
                  max-w-sm px-4 mt-0 transform -translate-x-1/2 
                  left-1/2 sm:px-0 lg:max-w-3xl hidden peer-hover:flex hover:flex  justify-center items-center 
                  w-64 animate-rotateMenuY origin-top">
                     <div className="overflow-hidden 
                      w-full
                      rounded-lg 
                      shadow-lg ring-1 ring-black ring-opacity-5
                      
          bg-white relative p-7 text-center">
             {shopItems.map((item, index) => {
                      return (
                        <Link to="/shop" key={index} 
                        
                        >
                        <div className="flex 
                        items-center 
                        justify-center
                        py-2 text-center 
                        duration-150 ease-in-out 
                        text-black
                        transition-colors
                        rounded-lg hover:bg-black hover:text-white 
                        focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50
                        
                        ">
                          
                           
                            <p className="text-lg">
                            {item}
                              </p>  
                            
                          
                        </div>
                        </Link>
                      );
                    })}
        </div>
       </div>
       
    </div>

    )
}