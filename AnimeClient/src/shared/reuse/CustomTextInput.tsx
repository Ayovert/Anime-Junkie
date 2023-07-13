import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
  inputclass?: string;
  label?: string;
  type?: string;
  description?: string;
   rows?: number;
   placeholder?:string;
}

export default function CustomTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: props.type === "number" ? 0:"" });


  return (
    <>
      <div className="form-floating mb-8 relative z-0">
      


        { props.description !== "true" ? (
          <input
          {...props}
          {...field}
          // name={field.name}

          type={`${props.type ? props.type : 'text'}`}
          className={`${props.inputclass} form-input
          peer
      w-full
    block
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-transparent bg-clip-padding
    
    border-b-2 border-solid border-black
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    reveal:!hidden
    placeholder-transparent
    `}
    placeholder={props.placeholder}
          //value={field.value}
        />
        ) : (
          <textarea
      className="
        form-textarea
        peer
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        bg-transparent border-b-2 appearance-none  focus:ring-0 
        placeholder-transparent

      "
      {...props}
      {...field}
      id={props.name}
      rows={props.rows}
      placeholder={props.label}
    ></textarea>
        )

}

<label className="peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:-z-10 peer-placeholder-shown:top-1.5 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-sm peer-focus:z-10  text-sm text-gray-700 absolute left-3 -top-3 transition-all duration-300  origin-0 bg-white">
          {props.label}
        </label>


        <span className="text-sm text-red-500 mt-2">{!!fieldState.error && fieldState.error.message}</span>

      </div>
    </>
  );
}
