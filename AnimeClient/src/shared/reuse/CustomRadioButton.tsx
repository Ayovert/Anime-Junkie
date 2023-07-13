import CardLogo from "../../assets/images/icons/cardLogo";


interface Props {
  selectedValue: string;
  options: any[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputClass?: string;
  className?:string;
}
export default function CustomRadioButton({
  selectedValue,
  options,
  onChange,
  inputClass,
  className
}: Props) {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {options.map(({ value, label, logo }) => {
        return (
          <div className="flex justify-between items-center py-3 w-full" key={label}>
            <div className="flex items-center w-full">
              <input
                className={`form-radio mr-2 h-8 w-8 text-transparent 
                checked:border-red-500 checked:border-2 checked:bg-radioBlack checked:bg-[length:4rem_3rem] focus:!border-red-500 focus:border-2 focus:ring-transparent hover:!border-red-700 
                 ${inputClass}`}
                type="radio"
                name={label}
                id={label}
                value={value}
                checked={value === selectedValue}
                onChange={(e) => onChange(e)}
              />
              <label
                className="inline-block text-gray-800"
               htmlFor={label}
              >
                {label}
              </label>

            </div>

            { value === "card" ? (
<CardLogo/>
            ):
            (logo)}
          </div>
        );
      })}
    </div>
  );
}
