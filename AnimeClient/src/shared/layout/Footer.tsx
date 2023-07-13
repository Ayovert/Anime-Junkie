import { ReactComponent as IGIcon } from "../../assets/images/icons/IG.svg";
import { ReactComponent as TwitterIcon } from "../../assets/images/icons/Twitter.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/images/icons/LinkedIn.svg";
import { ReactComponent as FacebookIcon } from "../../assets/images/icons/Facebook.svg";
import { useLocation } from "react-router-dom";

const nav1 = ["About Anime Clans", "Custom Orders", "Shop", "SIgn In"];

const nav2 = [
  "FAQs",
  "Terms and Conditions",
  "Privacy Policy",
  "Returns and Exchange Policy",
];

export default function Footer() {
  const location  = useLocation();

  const account = location.pathname === '/register' || location.pathname === '/login';
  return (
    <footer className={`h-auto bg-black w-full ${account ? "hidden":""}`}>
      <div className="text-white  flex flex-col lg:flex-row justify-center px-3 xl:px-24
      pt-12 lg:pt-24 pb-8 w-full">
        {/**Footer text*/}

        <div className="flex flex-col w-full lg:w-2/5 items-start px-8 2xl:px-24 lg:py-0 order-2 py-8 lg:order-1">
          <h4 className="text-xl font-bold">Anime Clan</h4>

          <span className="text-base my-8">
            Anime Clans is a retail experience created for fans of all things
            Anime lifestyle and culture. We carry exclusive officially licensed
            apparel, accessories, and more.
          </span>

          
        </div>
        {/**Footer Text */}

        {/**page nav */}
        <div className=" flex flex-wrap w-full lg:w-2/5 pl-8 lg:pr-20 order-1 lg:order-2 justify-center">
          <div className="w-1/2">
            <ul className="list-none">
              {nav1.map((value, index) => {
                return (
                  <li className="my-4" key={index}>
                    {value}
                  </li>
                );
              })}
            </ul>
          </div>

          {/**page nav 2*/}
          <div className="w-1/2">
            <ul className="list-none">
              {nav2.map((value, index) => {
                return (
                  <li className="my-4" key={index}>
                    {value}
                  </li>
                );
              })}
            </ul>
          </div>

          {/**end of page nav 2 */}
        </div>

        {/**end of page nav */}

        {/**social Icons */}
        <div className="flex flex-col w-full xl:w-1/5 px-8 order-3 my-8">
          <h3>Keep up with us on social media:</h3>
          <div className="flex flex-wrap  items-center lg:justify-start">
            <FacebookIcon className="m-2 fill-white" />
            <LinkedInIcon className="m-2" />
            <TwitterIcon className="m-2" />
            <IGIcon className="m-2" />
          </div>
        </div>

        {/**social Icons */}

       
      </div>
      <div className="text-sm text-center text-white w-full order-last pb-8">
            2022 Anime Clans . All Rights Reserved
          </div>
    </footer>
  );
}
