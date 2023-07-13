import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as EmailIcon } from "../../assets/images/icons/EmailIcon.svg";
import { ReactComponent as LockIcon } from "../../assets/images/icons/lockIcon.svg";
import { useAppDispatch } from "../../shared/redux/store";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomInput from "../../shared/reuse/CustomInputField";
import { DisplayError } from "./DIsplayError";
import { signInUser } from "./UserSlice";
import { ReactComponent as FacebookIcon } from "../../assets/images/icons/Facebook.svg";

import { ReactComponent as GoogleIcon } from "../../assets/images/icons/googleColor.svg";

export default function Login2() {
  const navigate = useNavigate();
  const location: any = useLocation();



  const locationState = window.location;

 

  const url = process.env.REACT_APP_BASEURL;

  const socialLogin: string = `${url}Account/ExternalLogin?provider=google&returnUrl=${locationState.origin}`;

  

  const dispatch = useAppDispatch();

  const [validationError, setValidationError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  async function submitForm(data: FieldValues) {
    //var login =
    try {
      await dispatch(signInUser(data));
      navigate(location.state?.from || location.state?.from?.pathname|| "/");
    } catch (error : any) {
      if(error && error.error !== undefined){
        const {status, title} = error.error;
        console.log(error);
      
      if( status === 401){
        setValidationError(title +  ` - check and try again`);
      }else{
        setValidationError(title)
      }
      
      }else{
        setValidationError("Could not validate user data. Try again later")
      }

      
      

      setTimeout(() => {
        setValidationError("");
      }, 3000);
    }
  }

  return (
    <div className="">
      {/*<div className="w-full h-32 md:h-40 lg:h-72 relative bottom-[5.8rem] bg-loginHero2 bg-cover bg-[center_top] bg-no-repeat"></div>*/}

    {/**
     *  <div
          onClick={() => {
            navigate(-1);
          }}
          className="fixed cursor-pointer left-5 top-40 md:top-auto lg:left-36"
        >
          <span className="text-xl bg-slate-100 font-bold mb-6 p-3 rounded-3xl my-6 mx-2 ">
            {`< Back`}{" "}
          </span>
        </div>
     * 
     */}  <div className="relative w-screen h-screen flex flex-wrap mb-20 ">

<div className="w-full md:w-1/2 h-[143%] absolute md:relative top-[-5.6rem] bg-loginHero2 bg-cover md:bg-[center_left_-72rem] xl:bg-[center_left_-60rem] bg-no-repeat -scale-x-100 -z-10 ">

</div>

        <div className="bg-white rounded-2xl z-10 px-12 py-12 mt-32 md:my-12 md:px-24 flex flex-col h-full justify-center items-center w-full md:w-1/2">
          <div className="h-full w-full py-12">
            <h4 className="font-[Fujimaru] text-3xl mb-12">Welcome back</h4>


            {validationError && <div className="error my-5 flex flex-col justify-center items-center text-red-500">
  <span className="text-2xl">Error</span>
  <span className="text-xl " > {validationError} </span>
</div>}
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="flex flex-col justify-center mt-6">
                <div className="">
                <div className="loginUsename mb-8">
                    <CustomInput
                      label="Email or Username"
                      Logo={EmailIcon}
                      type="text"
                      inputclass=""
                      placeholder="username"
                      autoComplete="email"
                      autoFocus
                      register={register("username", {
                        required: "Username is required"
                      })}
                    />

                    <DisplayError errors={errors} inputType="username" />
                  </div>
                {/*  <div className="loginEmail mb-8">
                    <CustomInput
                      className="mb-1"
                      label="Email Address"
                      Logo={EmailIcon}
                      type="email"
                      placeholder="name@example.com"
                      inputclass="w-96"
                      autoComplete="email"
                      autoFocus
                      register={register("email", {
                        required: "Email is required",
                      })}
                    />

                    <DisplayError errors={errors} inputType="email" />
                    </div>*/}



                  <div className="loginPassword mb-8">
                    <CustomInput
                      className="mb-1"
                      label="Password"
                      Logo={LockIcon}
                      type="password"
                      placeholder="Password"
                      inputclass=""
                      autoComplete="current-password"
                      register={register("password", {
                        required: "Password is required",
                      })}
                    />

                    <DisplayError errors={errors} inputType="password" />
                  </div>
                </div>

                <div>
                  <Link to="">
                    <span className="float-right underline">
                      Forgot Password?
                    </span>
                  </Link>
                </div>

                <div>
                  <ButtonCustom
                    type="submit"
                    name="Login"
                    buttonClass="bg-black text-white !px-8 !py-4 hover:!bg-black/90 focus:!bg-black/90 focus:shadow-lg active:bg-black/90 active:shadow-lg text-lg normal-case"
                    className="mt-7"
                    loading={isSubmitting}
                    disabled={!isValid}
                  />
                </div>
              </div>
            </form>

            <div className="socialLogin flex flex-col text-black mt-16 justify-center items-center">
            <div className="flex w-full items-center justify-center">
              <hr className="w-2/5 text-black bg-black border-0 h-[2px]"/>
              <span className="w-1/5 text-center">Or continue using</span>
              <hr className="w-2/5 text-black bg-black border-0 h-[2px]"/>
            </div>
            <div className="flex mt-6 gap-x-4">
              
              <div className="bg-blue-200/30 p-2 rounded-lg border border-slate-200">
              <FacebookIcon className=" !fill-blue-500"/>
              </div>
              <Link to="/redirect" state={socialLogin}>
              <div className="bg-blue-200/30 rounded-lg p-2 border border-slate-200">
              <GoogleIcon className=""/>
              </div>
              </Link>
              
            </div>
          </div>
          <div className="my-6 text-center">
            <span>
              Don't have an account yet?{" "}
              <Link to="/register" className="underline text-red-500">
                {" "}
                Sign Up
              </Link>
            </span>
          </div>
          </div>

          

          
        </div>
      </div>
    </div>
  );
}
