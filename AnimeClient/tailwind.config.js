module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    
    extend: {
      colors: {
      'aot': '#fcf9ed',
      'naruto':'#f4d55e',
      'onePiece': '#FE8E48',
      'demonSlayer': '#31B7AC'
    }
  },
   
    backgroundImage: {
      hero1: "url('../public/images/hero1.png')",
      hero2:"url('../public/images/kimetsuBg.png')",
      shopHero: "url('../public/images/todoHero.png')",
      shopHero2: "url('../public/images/shopHero.png')",
      aboutHero: "url('../public/images/Hero.png')",
      loginHero: "url('../public/images/gokuHero.png')",
      loginHero2: "url('../public/images/itachi.jpg')",
      signUpHero: "url('../public/images/aotHero.png')",
      signUpHero2: "url('../public/images/aotHero2.png')",
      reviewHero: "url('../public/images/aotBg.png')",
      radioBlack: "url('../src/assets/images/icons/radioDot.svg')",
      kimets1: "url('../public/images/Asset4.png')",
    },

    keyframes: {
      zoom: {
        "0%, 100%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.5)" },
      },
      spin: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      wobbleAnim: {
        "0%, 100%": {
          transform: "translateX(0%)",
          "transform-origin": "50% 50%"
        },
      
        "15%": {
          transform: "translateX(-30px) rotate(-6deg)"
        },
      
        "30%": {
          transform: "translateX(15px) rotate(6deg)"
        },
      
        "45%": {
          transform: "translateX(-15px) rotate(-3.6deg)"
        },
      
        "60%": {
          transform: "translateX(9px) rotate(2.4deg)"
        },
      
        "75%": {
          transform: "translateX(-6px) rotate(-1.2deg)"
        }
      },
      wobbleAnimTop: {
        "0%, 100%": {
          transform: "translateX(0%)",
          "transform-origin": "50% 50%"
        },
      
        "15%": {
          transform: "translateX(-30px) rotate(6deg)"
        },
      
        "30%": {
          transform: "translateX(15px) rotate(-6deg)"
        },
      
        "45%": {
          transform: "translateX(-15px) rotate(3.6deg)"
        },
      
        "60%": {
          transform: "translateX(9px) rotate(-2.4deg)"
        },
      
        "75%": {
          transform: "translateX(-6px) rotate(1.2deg)"
        },
        rotateMenu: {
          "0%": {
              transform: "rotateX(-90deg)"
          },
          "70%" :{
              transform:" rotateX(20deg)"
          },
          "100% ":{
              transform: "rotateX(0deg)"
          }
      }
      }
    },
    "@-webkit-keyframes": {
      spin: {
        "0%": {
          "-webkit-transform": "rotate(0deg)",
        },
        "100%": {
          "-webkit-transform": "rotate(360deg)",
        },
      },
    },
    animation: {
      zoom: "zoom 200ms ease-in-out",
      spin: "spin 1s linear infinite",
      wobble: "wobbleAnim 5s ease 1s infinite normal forwards",
      wobbleTop: "wobbleAnimTop 5s ease 1s infinite normal forwards",
      wobbleReverse: "wobbleAnim 5s ease 1s infinite reverse forwards",
      wobbleTopReverse: "wobbleAnimTop 5s ease 1s infinite reverse forwards",
      rotateMenuY: "rotateMenu 400ms ease-in-out forwards"
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

//url('/src/assets/images/hero/hero2.png')
