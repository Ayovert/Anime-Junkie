import { ReactComponent as MasterCardIcon } from "./mastercard.svg";

export default function CardLogo(){
    return(
        <div className="p-3 bg-neutral-100 font-bold rounded-3xl flex">
      <MasterCardIcon height={20} width={40} className="bg-black mx-2" />
  
      <span className="text-sm flex"><span>***</span> <span>5678</span></span>
    </div>
    )
}
