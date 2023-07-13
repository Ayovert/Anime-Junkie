import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function CustomCheckboxGroup({
  items,
  checked,
  onChange,
}: Props) {

  const location: any = useLocation();
  console.log(location);


  const [checkedItems, setCheckedItems] = useState(checked || []);


 

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);

    let newChecked: string[] = [];
    if (currentIndex === -1) {
      newChecked = [...checkedItems, value];
    } else {
      newChecked = checkedItems.filter((item) => item !== value);
    }
    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <div className="flex items-center">
      <div>
        {items.map((item) => (
          <div className="flex items-center" key={item}>
            <input
              type="checkbox"
              className="form-checkbox h-6 w-6 my-2  rounded border-gray-300 text-red-500 focus:ring-red-500"
              value={item}
              name={item}
              checked={checkedItems.indexOf(item) !== -1}
              onChange={() => handleChecked(item)}
              id={item}
            />
            {/* <CheckIcon className={`absolute top-1 h-6 w-6  text-white ${checkedItems.indexOf(item) !== -1 ? 'opacity-100' : 'opacity-0'} `} />*/}
            <label
              className="ml-4 inline-block text-gray-800 cursor-pointer relative  "
              htmlFor={item}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
