import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent2 from "../../shared/reuse/LoadingComponent2";
import { Order } from "../../shared/model/order";
import { useAppDispatch, useAppSelector } from "../../shared/redux/store";
import { currencyFormat } from "../../shared/util/util";
import { getOrderAsync, ordersSelectors } from "./orderSlice";

export default function OrdersDetails() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);
  const { id } = useParams<{ id: string }>();
  const [orders, setOrders] = useState<Order>();

  const oid = parseInt(id!);

  const orderSelect = useAppSelector((state) =>
    ordersSelectors.selectById(state, oid)
  );

  useEffect(() => {
    try {
      if (!orderSelect) dispatch(getOrderAsync(oid));

      setOrders(orderSelect);

      return () => {
        setLoading(false);
        mountedRef.current = false;
      };
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [dispatch, orderSelect, oid]);

  if (loading) return <LoadingComponent2 message="Loading Order Details... " />;

  return (
    <div className="m-7 md:m-20 w-full">
      My Orders Details
      {orders ? (
        <div className="md:m-14">
          <h2 className=" w-fit p-4 text-3xl my-7 rounded-3xl border-2 border-red-700">
            {`Order #${id}`}
          </h2>

          <div className="">
            <table className="w-full text-sm text-left text-gray-500 hidden md:table">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 my-4 ">
                <tr className="col-3">
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.orderItems.map((order) => {
                  return (
                    <tr
                      className="bg-white border-b hover:bg-gray-50"
                      key={order.name}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                      >
                        <div className="w-20 flex justify-center items-center">
                          <img
                            src={order.pictureUrl}
                            alt={order.name}
                            className="h-14 mr-5"
                          />
                        </div>
                      </th>
                      <td className="px-6 py-4">{order.name}</td>
                      <td className="px-6 py-4">Qty: {order.quantity}</td>

                      <td className="px-6 py-4">
                        Price: {currencyFormat(order.price)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/**mobile order details */}
            <div>
              {orders.orderItems.map((order) => {
                return (
                  <div className="my-4 block md:hidden">
                    <div className="flex justify-between">
                      <div className="w-1/3 flex">
                        <img
                          src={order.pictureUrl}
                          alt={order.name}
                          className="h-14 mr-5"
                        />
                      </div>

                      <h4 className="w-1/3 text-center">
                        {order.name}
                      </h4>

                      <div className="flex flex-col w-1/3 text-right">
                        <span className="">N{order.price}</span>
                        <span>Qty: {order.quantity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/**mobile order details */}
          </div>

          <div className="flex flex-col md:text-lg md:my-4">
            <span className="px-6 py-2">Address:</span>

            <span className="px-6 py-2">
              Payment Status: {orders.orderStatus}
            </span>

            <span className="px-6 py-2">
              To be Delivered On: {orders.orderDate.split("T")[0]}
            </span>

            <span className="px-6 py-2">Delivered?: Not Yet</span>
          </div>
          <div></div>
        </div>
      ) : (
        <div className="m-14">
          <span className="md:text-2xl">Order Details Not available</span>
        </div>
      )}
    </div>
  );
}
