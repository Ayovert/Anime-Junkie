// Clothes
// Accessories
// Home Items
// Cosplay
// Figurines
// Fragrance
// Decoratives

import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../components/Account/UserSlice";
import { clearCart } from "../../components/Cart/cartSlice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  name: string;
}

const shopItems = [
  "Clothes",
  "Accessories",
  "Home Items",
  "Cosplay",
  "Figurines",
  "Fragrance",
  "Decoratives",
];

export default function Dropdown({ name }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutDuration = 200;
  let timeout: any;
  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      })
    );
  };

  const onMouseEnter = (open: boolean) => {
    clearTimeout(timeout);
    if (open) return;
    return buttonRef.current?.click();
  };

  const onMouseLeave = (open: boolean) => {
    if (!open) return;
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };

  return (
    <div className=" inline-block text-left">
      <Popover className="relative">
        {({ open }) => (
          <>
            <div className="" onMouseLeave={onMouseLeave.bind(null, open)}>
              <Popover.Button
                className={`${open ? "" : "text-opacity-90"}`}
                ref={buttonRef}
                onMouseEnter={onMouseEnter.bind(null, open)}
                onMouseLeave={onMouseLeave.bind(null, open)}
              >
                <Link to="shop">
                  <div className="inline-flex items-center justify-center space-x-2 px-2  w-full">
                    <h4 className="">{name}</h4>

                    <ChevronDownIcon
                      className={`${open ? "" : "text-opacity-70"}
                    ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Popover.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel
                  className="absolute z-10 w-screen 
                  max-w-sm px-4 mt-0 transform -translate-x-1/2 
                  left-1/2 sm:px-0 lg:max-w-3xl"
                >
                  <div
                    className="overflow-hidden 
                      
                      rounded-lg 
                      shadow-lg ring-1 ring-black ring-opacity-5"
                    onMouseEnter={onMouseEnter.bind(null, open)}
                    onMouseLeave={onMouseLeave.bind(null, open)}
                  >
                    <div className="relative bg-white p-7 ">
                      {shopItems.map((item, index) => {
                        return (
                          <Link
                            to="/shop"
                            key={index}
                            className="flex items-center p-2 -m-3 
                        transition duration-150 ease-in-out 
                        rounded-lg hover:bg-gray-50 
                        focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <div className="ml-4">
                              <p
                                className="text-sm font-medium 
                              text-gray-900"
                              >
                                {item}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/** <form method="POST" action="#"> */}

                    {/**</form> */}
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
}
