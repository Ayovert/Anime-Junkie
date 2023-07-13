import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLSelectElement>{
    selectedValue: string;
  onChange: (event: any) => void;
    inputclass?: string;
    label:string;
    items: string[];
    className?:string;
}

export default function AppSelectList2({ label, items, value, inputclass, className, onChange}:Props) {
  return (
    <>
    <div className={`form-floating mb-8 relative z-0 w-full ${className}`}>
    
        <select
                value={value}
                onChange={onChange}
                
          className={` ${inputclass} form-select
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
    placeholder-transparent`}
    placeholder={label}
        >
            <option className="p-5" value="" disabled hidden></option>
            {items.map((item,index) => {
                return(
                    <option className="" key={index} value={item}>{item}</option>  
                );
            })}
          
        </select>
        
    <label htmlFor="select" className={`text-base text-gray-400 -z-10 peer-focus:-top-3 peer-focus:text-gray-700 peer-focus:text-sm peer-focus:z-10 absolute top-1 left-3  transition-all duration-300  origin-0 bg-white ${value !=="" ? '!-top-3 !text-gray-700 !text-sm !z-10' : ''}`}>{label}</label>

      </div>
    </>
  )
}
