import { Cart } from "../model/cart";
import {gsap} from "gsap";
import { useCallback } from "react";



export function RGBAToHexA(color:any) {
  let  r = color.r.toString(16);
   let g = color.g.toString(16);
  let  b = color.b.toString(16);
    let a = Math.round(color.a * 255).toString(16);
  
    if (r.length === 1)
      r = "0" + r;
    if (g.length === 1)
      g = "0" + g;
    if (b.length === 1)
      b = "0" + b;
    if (a.length === 1)
      a = "0" + a;
  
    return  r + g + b;
  }

export function getCookie(key : string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

    const bstr = b ? b.pop() : "";

    const result = bstr !== undefined ? bstr : "";
    return decodeURIComponent(result);
  }
  


  export function currencyFormat(amount : number){
    
    const convertedAmount = (amount/100).toFixed(2);

  
    //regex to add commas
    return `N${convertedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  export function amountFormat(){

  }


 export function isObjectEmpty(object:any) {
    return Object.keys(object).length === 0;
  }

  export function getCartTotal(cart: Cart | null){
    const subtotal =
    cart?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  const tax = (7.5 / 100) * (subtotal + deliveryFee);

  const total = subtotal + deliveryFee + tax;

  return {subtotal, tax, deliveryFee, total};
  }


  export function setAnimation() {
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
  return;
  
  }
