import { useAppSelector } from "../../../shared/redux/store";

export default function DeliveryDeets(){
  const {userAddress} = useAppSelector((state) => state.user);
    return(
        <div className="mb-14 w-full md:w-3/4">
        <h4 className="text-lg mb-6 font-bold">Delivery Details</h4>

  
        {/**Full Name * Phone **/}
  <div className="flex">
  <div className="flex flex-col justify-between  w-full">
        <div className="flex flex-col w-4/5 md:w-1/2 mb-4">
          <span className="text-sm opacity-40"> Delivery Address{"(es)"}</span>
  
          <p className="text-base mb-3 mt-1 w-full">  {userAddress !== null ? `${userAddress.address1}, ${userAddress.address2}, ${userAddress.city}, ${userAddress.state}` : "N/A"}</p>

<p className=" w-full text-base">1, Grace Crescent, Yaba, Lagos</p>

        </div>
  
        <div className="flex flex-col w-4/5 md:w-1/2 mb-4">
          <span className="text-sm opacity-40"> Phone Number</span>
  
          <span className="text-base ">  {userAddress !== null ? `(234) ${userAddress.telephone}` :"N/A"}</span>
        </div>
        </div>
  
  
        {/**Full Name * Phone **/}
  
        <div className="flex justify-between w-full">
  
        <div className="flex flex-col w-1/2">
          <span className="text-sm opacity-40">Special Instructions</span>
  
          <span className="text-base"> Don't knock , just call</span>
        </div>
        </div>
  </div>
       
  
        
      </div>
    );
}