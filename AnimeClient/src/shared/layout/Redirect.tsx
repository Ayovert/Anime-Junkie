import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingComponent2 from "../reuse/LoadingComponent2";

export default function Redirect() {
  const location: any = useLocation();

  let url = "";

  if (location.state && typeof(location.state) === "string"){
    url = location.state;
  }else{
    url = location.state?.url;
  }

  console.log(location.state);

  useEffect(() => {
    if (url) {
      window.location.replace(url);
    }
  }, [url]);

  return (
    <div className="w-full h-full">
      <LoadingComponent2 message="Redirecting" />
    </div>
  );
}
