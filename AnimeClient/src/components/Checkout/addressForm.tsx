import { useFormContext } from "react-hook-form";
import CustomAppCheckbox from "../../shared/reuse/CustomAppCheckbox";
import CustomTextInput from "../../shared/reuse/CustomTextInput";

export default function AddressForm(){
   const {control, formState} = useFormContext();
    return(
        
        <div className="w-full md:w-3/5 p-5 md:p-10 my-5 bg-gray-200">
        <h6 className="text-xl"> Shipping Address</h6>
        <div className="flex flex-wrap flex-col m-10">
            <div className="w-full">
                <CustomTextInput name="fullName" label="Full Name" inputclass="" control={control}/>
            </div>
            <div className="w-full">
                <CustomTextInput name="address1" label="Address 1" inputclass="" control={control} />
            </div>

            <div className="">
                <CustomTextInput name="address2" label="Address 2" control={control} />
            </div>
            <div className="flex justify-between">
            <div className="w-1/2 mr-4">
                <CustomTextInput name="city" label="City" control={control} />
            </div>
            <div className="w-1/2 ml-4">
                <CustomTextInput name="state" label="State/Province/Region" control={control} />
            </div>
            </div>
            
            <div className="flex">
            <div className="w-1/2 mr-4">
                <CustomTextInput name="postalCode" label="Postal Code /Zip" control={control} />
            </div>
            <div className="w-1/2 ml-4">
                <CustomTextInput name="country" label="Country" control={control} />
            </div>
            </div>
            

            <div className="flex">
            <div className="w-1/2 mr-4">
                <CustomTextInput name="telephone" label="Telephone" control={control} />
            </div>
            <div className="w-1/2 ml-4">
                <CustomTextInput name="mobile" label="Mobile" control={control} />
            </div>
            </div>
            

            <div>
                <CustomAppCheckbox
                disabled={!formState.isDirty}
                control={control}
                label="Save this Address as default"
                name="saveAddress"
                
    />
            </div>
        </div>
        </div>
    )
}