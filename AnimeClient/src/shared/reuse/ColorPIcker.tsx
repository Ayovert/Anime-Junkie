import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { Color, ColorResult, SketchPicker, TwitterPicker } from 'react-color'
import { ChevronDownIcon } from '@heroicons/react/solid';
import { RGBAToHexA } from '../util/util';

interface Props{
  handleChange : (color: any) => void;
  color : any
}

export default function ColorPicker({handleChange, color}:Props) {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);



 const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker );
  };

 const handleClose = () => {
    setDisplayColorPicker(false);
  };

  //function handleChange (color : any) {
    //setColor(color);
  //};


 

 


    const styles = reactCSS({
      'default': {
        color: {
        //  background: `rgba(${ color.r }, ${ color.g }, ${ color.b }, ${ color.a })`,
          background: `#${RGBAToHexA(color)}`,
        },
      },
    });
console.log(RGBAToHexA(color))
    return (
      <div>
        <div className="swatch p-2 bg-white rounded-sm inline-flex justify-center items-center cursor-pointer shadow border  text-neutral-500 " 
        onClick={handleClick }>
            <span className="">Click to Select a Material Color</span>
          <div style={ styles.color } className=" ml-12 w-9 h-6 rounded-sm" />

          <ChevronDownIcon
                      className={`
                    ml-2 h-6 w-6 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                      aria-hidden="true"
                    />
        </div>
        { displayColorPicker ? (

<div className="popover absolute z-[2]">
<div className="cover fixed inset-0" 
          onClick={ handleClose }/>
<TwitterPicker color={ color } onChange={(color) => handleChange(color.rgb) } />
</div>
        )
         : (null)
         }

      </div>
    )
  
}

