import { useState, useRef, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import LoadingComponent2 from "../../shared/reuse/LoadingComponent2";

import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { currencyFormat } from "../../shared/util/util";
import { getOrdersAsync } from "./orderSlice";

export default function OrdersList(){
 

    const { orders} = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();



 
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);



  const getOrders = useCallback(async () => {

    try{

      await dispatch(getOrdersAsync());
      setLoading(false);
    
    }catch(error){
      console.log(error)
      setLoading(false);
    }
    
      

  },[dispatch])

  
  useEffect(() => {

   getOrders();

    return () => {
      mountedRef.current = false;
    };
  }, [getOrders]);

  if (loading) return <LoadingComponent2 message="Loading Orders... " />;

  if (!orders) return (
    <div className="m-24">
     <h3 className="text-xl">You have no orders to display</h3>
     <Link to="/shop">
              
              <ButtonCustom
                name="Continue Shopping"
                buttonClass="bg-red-500 text-white !px-8 !py-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-sm normal-case w-full justify-center"
                className="mt-7 w-full"
              /></Link>
    </div>


  );
    return(
        <div className="md:mx-40 my-20 flex flex-col items-center w-full">
       <h1 className="text-2xl">My Orders</h1> 

        <div className="p-10 w-full">
        <table className="hidden md:table w-full text-sm text-left text-gray-500">
				<thead  className="text-xs text-gray-700 uppercase bg-gray-50 my-4 ">
					<tr className="col-3">
					
						<th scope="col" className="px-6 py-3">
							Order Number
						</th>
						<th scope="col" className="px-6 py-3">
							Total
						</th>
						<th scope="col" className="px-6 py-3">
							Order Date
						</th>
						<th scope="col" className="px-6 py-3">
							Order Status
						</th>
						<th scope="col" className="px-6 py-3">
							<span className="sr-only">Order Details</span>
						</th>
					</tr>
				</thead>
				<tbody>
                    {orders?.map((order) => {
                        return(

                            <tr
						className="bg-white border-b hover:bg-gray-50" key={order.id}>
						
						<th scope="row" className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
							{order.id}
						</th>
						<td className="px-6 py-4">
							{currencyFormat(order.total)}

						</td>
						<td className=" px-6 py-4">
							{order.orderDate.split("T")[0]}
						</td>
						<td className="px-6 py-4">
                        {order.orderStatus}
						</td>
						<td className=" md:px-6 py-4 text-right">
              <Link to={`/orders/${order.id}`}>
              <ButtonCustom name="Order Details" buttonClass={ ` bg-red-700 hover:!bg-red-800 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-white flex justify-between !text-sm`}/>
              </Link>
                        
						</td>
					</tr>
                        )
                    })}
					
				
				</tbody>
			</table>
{/**mobile order list */}
<div className=" block md:hidden">
{orders?.map((order) => {
                        return(
                          <Link  key={order.orderDate} to={`/orders/${order.id}`}>
                          <div className="flex my-6 w-full justify-between">
                          <div className="flex flex-col text-left w-1/2">
                          <h4 className="mb-3">
                           Order - #{order.id}
                          </h4>
                          <span className="">{order.orderStatus}</span>
                          
                          </div>
                  
                          <div className="flex flex-col text-right w-1/2 ">
                            <h4 className="mb-3 font-bold"> {currencyFormat(order.total)}</h4>
                            <span className="">{order.orderDate.split("T")[0]}</span>
                            
                          </div>
                          </div>
                          </Link>
                         
                        )})
}
</div>
      
     
       
     
        </div>
        <Outlet />
        </div>
    )
}