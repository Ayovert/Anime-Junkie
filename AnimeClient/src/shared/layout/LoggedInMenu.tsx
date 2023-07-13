import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { useAppDispatch } from "../redux/store";
import { signOut } from "../../components/Account/UserSlice";
import { clearCart } from "../../components/Cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  name: string;
  home: boolean;
}
export default function LoggedInMenu({ name,home }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div className="">
            <Menu.Button className={`inline-flex items-center justify-center space-x-2 px-2  w-full   shadow-sm  lg:text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 rounded-lg`}>
              <div className="w-max mx-2 flex py-1 h-11">
                <img
                  className="inline-block h-full w-full rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <h4 className="">{name}</h4>

              {/*<ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />*/}
            </Menu.Button>
          </div>

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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item as="div">
                  {({ active }) => (
                     <Link to="/profile">
                    
                     <span
                      
                       className={classNames(
                         active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                         "block px-4 py-2 text-sm"
                       )}
                     >
                       Account Settings
                     </span>
                     </Link>
                  )}
                </Menu.Item>
                <Menu.Item as="div">
                  {({ active }) => (
                    <Link to="/orders">
                    
                    <span
                     
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Orders
                    </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item as="div">
                  {({ active }) => (
                    <a
                      href="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      License
                    </a>
                  )}
                </Menu.Item>
                {/** <form method="POST" action="#"> */}
                <Menu.Item as="div">
                  {({ active }) => (
                    <Menu.Button
                      //type="submit"
                      // type="button"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full text-left px-4 py-2 text-sm"
                      )}
                      onClick={() => {
                        dispatch(signOut());
                        dispatch(clearCart());
                        navigate("/");
                      }}
                    >
                      Sign out
                    </Menu.Button>
                  )}
                </Menu.Item>
                {/**</form> */}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
