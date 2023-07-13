interface Props{
    svgClass: string;
}


export default function CurvedText({svgClass}:Props){
    return(
        
        <svg height={400} width="600">
    <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"  className={`${svgClass}`}/>
    <text width="500" fill="white" fontSize="2rem">
      <textPath xlinkHref="#curve">
        Dangerous Curves Ahead
      </textPath>
    </text>
  </svg>
    )
}


{/**<svg viewBox="0 0 800 800"> */}