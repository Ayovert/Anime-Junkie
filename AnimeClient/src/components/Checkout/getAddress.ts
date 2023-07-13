import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";
import agent from "../../shared/api/agent";
import { validationSchema } from "./checkoutValidation";


export function getAddress(methods: UseFormReturn<FieldValues, any>)  {
  
    try {
     
        agent.User.fetchAddress()
          .then((response) => {
           
            
            if (response) {
              methods.reset({
                ...methods.getValues(),
                ...response,
                saveAddress: false,
              });
            }
          })
          .catch((error) => console.log(error));
      }
     catch (error) {
      console.log(error);
    }

    // }, [checkPayment, tranId, tranRef, tranStatus]);
};