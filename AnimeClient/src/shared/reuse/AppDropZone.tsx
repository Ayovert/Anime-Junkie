import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController, UseControllerProps } from "react-hook-form";
import { ReactComponent as UploadIcon } from "../../assets/images/icons/uploadIcon.svg";

interface Props extends UseControllerProps{
    class? : string;
    multiple?: boolean;
}

export default function AppDropzone(props:Props){

    const {field, fieldState } = useController({...props, defaultValue:null})

    //const [files , setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files

        if(acceptedFiles.length > 0){

          acceptedFiles.map((acceptedFile: any) => Object.assign(acceptedFile, {preview: URL.createObjectURL(acceptedFile)}));
        }

        
        field.onChange(acceptedFiles);
        
      }, [field])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        multiple:props.multiple
      })
    
      return (
        <div {...getRootProps()} className={`${props.class} w-full`}>
            <div className={`form-control ${isDragActive ? 'flex flex-col border-dashed border-4 rounded pt-2 items-center justify-center h-52 w-full border-green-600 cursor-pointer' : 'flex flex-col border-dashed border-4 rounded pt-2 items-center justify-center border-[#eee] h-52 w-full cursor-pointer' }`}>
            <input type="file" {...getInputProps()}/>
            <UploadIcon className="h-10 w-10 text-xl"/>

            <h4 className="text-lg">Click/Drop Image here to upload</h4>

            </div>


            <span className="text-sm text-red-500 mt-2">{!!fieldState.error && fieldState.error.message}</span>

          
        </div>
      );

}