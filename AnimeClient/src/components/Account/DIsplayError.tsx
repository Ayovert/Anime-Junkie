import { isObjectEmpty } from "../../shared/util/util";

interface ErrorProps{
    errors: any;
    inputType:string;
  }
  
export function DisplayError({errors, inputType}:ErrorProps){
    return(
    <div className="text-sm text-red-600">
    {isObjectEmpty(errors) ? "" :
    
    
    inputType === "email" && !!errors.email && errors.email.message !== "" ? 
  <span className="">{errors.email.message}</span> :
  inputType === "username" && !!errors.username && errors.username.message !== "" ? 
  <span className="">{errors.username.message}</span> : 
  
  inputType === "rating" && !!errors.rating && errors.rating.message !== "" ? 
  <span className="">{errors.rating.message}</span>
  
  :
  inputType === "confirmPass" && !!errors.confirm_password && errors.confirm_password.message !== "" ? 
  <span>{errors.confirm_password.message}</span> : 
  inputType === "password" && !!errors.password && errors.password.message !== ""
  ?
  <span>{errors.password.message}</span> : 
   inputType === "password" && !!errors.password && errors.password.type === "pattern"?
   
    <div className="">
    Your Password does not meet minimum complexity requirements::
     <ul>
       <li>Between 6 to 10 characters</li>
       At least:
       <li>1 LowerCase letter  </li>
       <li>1 UpperCase letter</li>
       <li>1 Special character {"(excluding   \\ | < = [ ] ` ~ )"}</li>
     </ul>
     
     </div> :""
  
  
  }
    </div>
  
    )
  }
  