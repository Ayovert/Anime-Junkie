
import './LoadingComponent.css'
interface Props{
    message? : string
    className?: string;
}
export default function LoadingComponent2({message ='Loading....', className} : Props){
    return(
        <div className={`bouncing-loader
        flex justify-center items-center h-[67vh] ${className}`}>
        <div>
           <img src="/images/Asset4.png" alt='loader-img1'/> 
        </div>
        <div>
        <img src="/images/Asset5.png" alt='loader-img2'/>
        </div>
        <div>
        <img src="/images/Asset6.png" alt='loader-img3'/>
        </div>
      </div>
    )
}