import { ComponentType } from "react";
import { Navigate, RouteProps, RoutesProps, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/store";
import { isObjectEmpty } from "../util/util";

interface Props extends RoutesProps{
    component : ComponentType<RouteProps> | ComponentType<any>;
    roles?: string[];
}

export default function RequireAuth({ component : Component, roles, ...props }: Props)  {
    const {user} = useAppSelector(state => state.user);
    let location = useLocation();
  
    if (!user || isObjectEmpty(user)) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if(roles && !roles.some(r => user.roles?.includes(r))){
      toast.error('Not authorized to access this page');
      
      return <Navigate to="/shop"  replace />;
    }
  
    return <Component {...props}/>;
  }