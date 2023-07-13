import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController, UseControllerProps } from "react-hook-form";
import { ReactComponent as UploadIcon } from "../../assets/images/icons/uploadIcon.svg";

interface Props extends UseControllerProps{
    class? : string;
}

export default function SketchDropzone(props:Props){

    const {field, fieldState } = useController({...props, defaultValue:null})

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        
        acceptedFiles[0] = Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})

      


        field.onChange(acceptedFiles[0]);
      }, [field])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        multiple:false
      })
    
      return (
        <div {...getRootProps()} className={`${props.class} w-full`}>
            <div className={`form-control ${isDragActive ? ' border-dashed  w-full border-green-600 cursor-pointer' : 'border-neutral-300 border-2 w-full cursor-pointer' } flex items-center   h-9 bg-[#EBEAEA] border-2 rounded pl-8 py-4`}>
            <input type="file" {...getInputProps()} />
            <UploadIcon className="h-6 w-6 px-1 text-neutral-700"/>

            <h4 className="text-neutral-500 underline underline-offset-1">Click/Drag here to Upload</h4>

            </div>


            <span className="text-sm text-red-500 mt-2">{!!fieldState.error && fieldState.error.message}</span>

          
        </div>
      );

}