import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import CustomInput from "../../shared/reuse/CustomInputField";
import { ReactComponent as EmailIcon } from "../../assets/images/icons/EmailIcon.svg";
import { ReactComponent as LockIcon } from "../../assets/images/icons/lockIcon.svg";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../shared/api/agent";
import { toast } from "react-toastify";
import { useRef } from "react";
import { DisplayError } from "./DIsplayError";
import { ReactComponent as FacebookIcon } from "../../assets/images/icons/Facebook.svg";

import { ReactComponent as GoogleIcon } from "../../assets/images/icons/googleColor.svg";

export default function SignUp() {
  const navigate = useNavigate();

  const location: any = useLocation();



  const locationState = window.location;

 

  const url = process.env.REACT_APP_BASEURL;
  const socialLogin: string = `${url}Account/ExternalLogin?provider=google&returnUrl=${locationState.origin}`;

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  const password = useRef({});
  password.current = watch("password", "");

  async function submitForm(data: FieldValues) {
    await agent.User.register(data)
      .then(() => {
        toast.success("Sign Up Successful - you can now login \n"
        +"Check Your email for verification link");

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        handleAPIErrors(error);
      });
  }

  function handleAPIErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <div className="">

      

      <div className="relative w-screen md:h-screen flex flex-wrap mb-60">
    

        <div className="w-full md:w-1/2 h-[140%] absolute md:relative top-[-5.6rem] bg-signUpHero2 bg-cover md:bg-[center_left_2rem] bg-no-repeat -scale-x-100 -z-10">

</div>
<div className="bg-white rounded-2xl z-10 px-12 md:px-24 mt-32 md:my-12 flex flex-col py-12 justify-center items-center w-full h-full md:w-1/2">
          <div className="md:h-full w-full">
            <h4 className="font-[Fujimaru] text-3xl mb-12 pt-10">Create Account</h4>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="flex flex-col justify-center mt-6">
                <div className="md:w-96">
                  <div className="mb-8">
                    <CustomInput
                      label="Email Address"
                      Logo={EmailIcon}
                      type="email"
                      placeholder="name@example.com"
                      register={register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                          message: "Not a valid email address",
                        },
                      })}
                    />

                    <DisplayError errors={errors} inputType="email" />
                  </div>

                  <div className="mb-8">
                    <CustomInput
                      label="Username"
                      Logo={EmailIcon}
                      type="text"
                      placeholder="username"
                      register={register("username", {
                        required: "Username is required"
                      })}
                    />

                    <DisplayError errors={errors} inputType="username" />
                  </div>

                  <div className="mb-8">
                    <CustomInput
                      label="Password"
                      Logo={LockIcon}
                      type="password"
                      inputRef={password}
                      placeholder="Password"
                      register={register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{"";:;'?/>;.>;,])(?!.*\s).*$/,
                          message: "",
                        },
                      })}
                    />
                    <DisplayError errors={errors} inputType="password" />
                  </div>

                  <div className="mb-8">
                    <CustomInput
                      label="Confirm Password"
                      Logo={LockIcon}
                      type="password"
                      placeholder="Confirm Password"
                      register={register("confirm_password", {
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",
                      })}
                    />

                    <DisplayError errors={errors} inputType="confirmPass" />
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
                    name="Sign Up"
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


          <div className="my-6 text-center pb-10">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="underline text-red-500">
                {" "}
                Login
              </Link>
            </span>
          </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
