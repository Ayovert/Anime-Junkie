import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../shared/api/agent";
import LoadingComponent2 from "../../shared/reuse/LoadingComponent2";

export default function ConfirmEmail() {

  const { token, email } = useParams<{ token: string; email: string }>();

  const [verificationMessage, setVerificationMessage] = useState("");

  const [error, setError] = useState<string[]>();

  const [loading, setLoading] = useState(true);

  const mountedRef = useRef(false);

  const verifyEmail = useCallback(() => {
    agent.User.verifyEmail(token!, email!)
      .then((response) => {
        setVerificationMessage("Email Verified Successfully");
        setLoading(false);

       /* setTimeout(() => {
          navigate(location.state?.from?.pathname || "/");
        }, 3000);*/
      })
      .catch((error) => {
        console.log(error);
        setVerificationMessage("Email Verification Failed");
        error.forEach((error: any) => {
          setError(error);
        });

        setLoading(false);
      });
  }, [email, token]);

  useEffect(() => {
    verifyEmail();

    return () => {
      mountedRef.current = true;
    };
  }, [verifyEmail]);

  if (loading) return <LoadingComponent2 message="Verifying Email... " />;

  return (
    <>
      <div className="mx-48 my-24 w-full flex items-center justify-center">
        {error && error.length > 0 ? (
          <div className="flex flex-col">
            <h2 className="text-2xl my-4">{verificationMessage}</h2>

            <span className="text-xl text-red-500 my-4">{error}</span>
          </div>
        ) : (
          <h2 className="text-2xl text-green-600">{verificationMessage}</h2>
        )}
      </div>
    </>
  );
}
