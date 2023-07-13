import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ButtonCustom from "../../shared/reuse/ButtonCustom";
import { ReactComponent as SpaceMan } from "../../assets/images/spaceman.svg";
import gsap from "gsap";
import './NotFound.css'
import { setAnimation } from "../../shared/util/util";



export default function NotFound2()
{

  const el = useRef(null);
  const q = gsap.utils.selector(el);

 

  useLayoutEffect(() => {

    setAnimation();


  },[])


    return(
        <div className="mx-20 my-20 lg:mb-36 lg:mt-10 h-[47vh]">
            <div className="container h-full">
    <div className="flex flex-wrap flex-col lg:flex-row font-[Nunito] h-full items-center " >
      <div className="lg:w-1/2 relative my-20 h-full" >
        <SpaceMan className="w-full h-full" ref={el} />
      </div>
      <div className="lg:w-1/2 relative h-full my-8">
        <h1 className="text-5xl my-4">404</h1>
        <h2 className="text-3xl my-4">UH OH! You're lost.</h2>
        <p className="text-base my-4 w-3/5">The page you are looking for does not exist.
          How you got here is a mystery. But you can click the button below
          to go back to the homepage.
        </p>
       <Link to="/"><button className="btn green
       hover:bg-red-500 hover:text-white before:hover:w-full before:bg-red-500 border-4 border-red-400 hover:border-red-500 text-sm">HOME</button></Link> 
      </div>
    </div>
  </div>
        </div>
    )
  }

  /*const setAnimation = useCallback(() => {
  gsap.set("svg", { visibility: "visible" });
gsap.to("#headStripe", {
  y: 0.5,
  rotation: 1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
  duration: 1
});
gsap.to("#spaceman", {
  y: 10,
  rotation: 1,
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut",
  duration: 1
});
gsap.to("#craterSmall", {
  x: -6,
  yoyo: true,
  repeat: -1,
  duration: 1,
  ease: "sine.inOut"
});
gsap.to("#craterBig", {
  x: 9,
  yoyo: true,
  repeat: -1,
  duration: 1,
  ease: "sine.inOut"
});
gsap.to("#planet", {
  y:3,
  rotation: -2,
  yoyo: true,
  repeat: -1,
  duration: 1,
  ease: "sine.inOut",
  transformOrigin: "50% 50%"
});

gsap.to("#starsBig g", {
  rotation: "random(-30,30)",
  transformOrigin: "50% 50%",
  yoyo: true,
  repeat: -1,
  ease: "sine.inOut"
});
gsap.fromTo(
  "#starsSmall g",
  { scale: 0, transformOrigin: "50% 50%" },
  { scale: 1, transformOrigin: "50% 50%", yoyo: true, repeat: -1, stagger: 0.1 }
);
gsap.to("#circlesSmall circle", {
  y: -4,
  yoyo: true,
  duration: 1,
  ease: "sine.inOut",
  repeat: -1
});
gsap.to("#circlesBig circle", {
  y: -2,
  yoyo: true,
  duration: 1,
  ease: "sine.inOut",
  repeat: -1
});

gsap.set("#glassShine", { x: -68 });

gsap.to("#glassShine", {
  x: 80,
  duration: 2,
  rotation: -30,
  ease: "expo.inOut",
  transformOrigin: "50% 50%",
  repeat: -1,
  repeatDelay: 8,
  delay: 2
})


},[]) */
    
 // setAnimation();