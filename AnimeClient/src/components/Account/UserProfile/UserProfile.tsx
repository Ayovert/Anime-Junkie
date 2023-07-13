import { useState } from "react";
import { Link } from "react-router-dom";
import DeliveryDeets from "./DeliveryDetails";
import OrderHistory from "./OrderHistory";
import PersonalInfo from "./PersonalInfo";

const userTabs = [
  { id: "personalInfo", name: "Personal Information" },
  { id: "deliveryDeets", name: "Delivery Details" },
  { id: "orderHistory", name: "Order History" },
];

export default function UserProfile() {
  const currentURL = window.location.href; // returns the absolute URL of a page

  const pathname = window.location.pathname; //returns the current url minus the domain name

  console.log(pathname);
  console.log(currentURL);

  const [active, setActive] = useState("personalInfo");

  return (
    <div className="flex flex-col md:flex-row my-10 md:my-40 mx-3 md:mx-0 w-full">
      {/**left side */}
      <div className="w-full md:w-1/5">
        <ul className="relative">
          {userTabs.map(({ id, name }, index) => {
            return (
              <li
                key={index}
                className={`w-fit md:w-full text-sm md:text-lg mb-4 px-4 py-4 md:pr-2 rounded-r-lg ${
                  active === id ? "bg-black text-white" : ""
                } cursor-pointer relative `}
                onClick={() => {
                  setActive(id);
                }}
              >
                <a href={`#${id}`}>
                  <h6 className="md:w-max md:pl-8 pr-3 md:absolute right-0 top-0 bottom-0">
                    {name}
                  </h6>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/**left side */}

      {/**right side */}
      <div className="w-full md:w-3/5 md:ml-14 md:mr-40">
        <div id="personalInfo">
          <PersonalInfo />
        </div>

        <div id="deliveryDeets">
          <DeliveryDeets />
        </div>

        <div id="orderHistory">
          <OrderHistory />
        </div>
      </div>

      {/**right side */}
    </div>
  );
}
