import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex flex-col items-center justify-center w-full bg-[#E5E5E5]">
      <div className="w-full h-32 md:h-40 lg:h-72 relative bottom-[5.8rem] bg-signUpHero bg-cover md:bg-contain bg-top bg-no-repeat"></div>

      <div className="relative">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="absolute cursor-pointer left-5 top-32 md:top-auto lg:-left-[34rem]"
        >
          <span className="text-xl bg-slate-100 font-bold mb-6 p-3 rounded-2xl my-6 mx-2 ">
            {`< Back`}{" "}
          </span>
        </div>

        <div className="mb-14 flex flex-col justify-center items-center">
          <div className="bg-white rounded-2xl w-full p-14 mx-12 xl:m-0">
            <span className="font-[Fujimaru] text-3xl">Create Account</span>
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
              <div className="">
              <GoogleIcon className="m-2"/>
              </div>
            </div>
          </div>
          </div>

          <div className="my-10">
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
  );
}
