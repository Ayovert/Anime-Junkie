
interface Props{
    color? : string;
    headClass?: string;
}
export default function HeaderLogo({color, headClass}:Props){
    return(
        <div  className={`flex justify-center items-center w-full absolute py-6 z-40 ${headClass} `}>
            {color === "black" ? (
                <img src='/images/clanLogoB.png'  alt="clanLogoB" className={`h-6 w-6 mr-4 `}/>
            )
            :(
                <img src='/images/clanLogo.png'  alt="clanLogo" className={`h-6 w-6 mr-4 `}/>
            )}
        
        <span className={`text-${color} text-xl`}>Anime Clans</span>
      </div>
    )
}