import { useController, UseControllerProps } from "react-hook-form";
interface Props extends UseControllerProps {
  label: string;
  disabled: boolean;
}

export default function CustomAppCheckbox(props: Props) {
  const { field } = useController({ ...props, defaultValue: false });


  return (
      <div className="m-5">
  {/**  <Controller
    name="MyCheckbox"
    control={control}
    defaultValue={false}
    rules={{ required: true }}
    render={({ field }) => <Checkbox {...field} />}*/} 
    
    <label
      className="form-check-label 
    inline-flex flex-row-reverse items-center text-gray-800 cursor-pointer relative  "
      htmlFor={props.name}
    >
      {props.label}
      <input
      {...field}
        className="form-check-input appearance-none h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="checkbox"
        checked={field.value}
        disabled={props.disabled}
      />
      {/*<CheckIcon
        className={`absolute top-1 h-6 w-6  text-white ${
          checkedItems.indexOf(item) !== -1 ? "opacity-100" : "opacity-0"
        } `}
      />*/}
    </label>
    </div>
  );
}
