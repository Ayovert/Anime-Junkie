import { ButtonHTMLAttributes, FunctionComponent } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{
    name?:string;
    Logo?: FunctionComponent<React.SVGProps<SVGSVGElement>>; 
    buttonClass?: string;
    textClass?:string;
    loading?:boolean;
    disabled?:boolean;
    logoClass?:string;
    
}
export default function ButtonCustom({name, Logo, className, buttonClass, textClass, logoClass, onClick, loading, disabled, type}:Props){
    return(
        <div className={`flex items-center ${className}`} >
          
            
  <button
    type={`${type ?? 'button'}`}
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    className={` py-2 text-white font-medium text-sm leading-tight rounded-xl shadow-md hover:bg-gray-200 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition !font-[Inter] duration-150 ease-in-out ${buttonClass} ${disabled ? 'cursor-not-allowed opacity-40' : loading?  ' cursor-progress': ''}`}
    onClick={onClick}
    disabled={disabled}
  >
      
      
    {loading &&  <div className="loadingIcon flex">
    <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 border-t-red-700 rounded-full " role="status">
    
    </div>

      </div>}

      

      {!loading && <div className={`mx-2 flex items-center ${textClass}`}>
      { Logo &&
    <Logo className={`${logoClass} h-5 mx-1`}/>
    } 
        
      {name && <span className="">{name}</span> }  </div> }  

  
    </button>

    
    
</div>
    )
}