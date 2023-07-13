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

export default function Login() {
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
    <div className="flex flex-col items-center justify-center w-full bg-[#E5E5E5]">
      <div className="w-full h-32 md:h-40 lg:h-72 relative bottom-[5.8rem] bg-loginHero2 bg-cover bg-[center_top] bg-no-repeat"></div>

      <div className="relative">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="fixed cursor-pointer left-5 top-40 md:top-auto lg:left-36"
        >
          <span className="text-xl bg-slate-100 font-bold mb-6 p-3 rounded-3xl my-6 mx-2 ">
            {`< Back`}{" "}
          </span>
        </div>

        <div className="mb-14 flex flex-col justify-center items-center">
          <div className="bg-white rounded-2xl w-full p-14 mx-12 xl:m-0">
            <span className="font-[Fujimaru] text-3xl">Welcome back</span>


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
                      inputclass="md:w-96"
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
                      inputclass="md:w-96"
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
                    buttonClass="bg-red-500 text-white !px-8 !py-4 hover:!bg-red-700 focus:!bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg text-lg normal-case"
                    className="mt-7"
                    loading={isSubmitting}
                    disabled={!isValid}
                  />
                </div>
              </div>
            </form>

            <div className="socialLogin flex flex-col text-black mt-16 justify-center items-center">
            <div className="flex w-full items-center justify-center">
              <hr className="w-1/4 text-black bg-black border-0 h-[2px]"/>
              <span className="w-2/4 text-center">Or continue using</span>
              <hr className="w-1/4 text-black bg-black border-0 h-[2px]"/>
            </div>
            <div className="flex">
              
              <div className="">
              <FacebookIcon className="m-2 !fill-blue-500"/>
              </div>
              <Link to="/redirect" state={socialLogin}>
              <div className="">
              <GoogleIcon className="m-2"/>
              </div>
              </Link>
              
            </div>
          </div>
          </div>

          

          <div className="my-10">
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
  );
}
