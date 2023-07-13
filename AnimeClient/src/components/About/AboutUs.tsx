import { categories } from "../../shared/util/data";

export default function AboutUs(){
    return(
        <div className="my-20">
          <div className="w-full h-60 flex items-center relative bottom-[5.8rem] bg-aboutHero bg-cover  bg-[center_right_-16rem]  md:bg-center lg:bg-no-repeat">

            <h3 className="pl-36 pt-24 text-white text-4xl font-[Rakkas]">About Us</h3>
          </div>
            
            <section className="w-full my-10 relative">

              <div className="w-full flex flex-col md:flex-row px-12 lg:px-24 xl:px-40">
                 {/**left */}
                 <div className="w-full pt-16 md:w-7/12">
                <h3 className="bg-red-100/50 text-red-500 font-bold px-6 py-2 rounded-2xl mb-16 w-fit ">WHO WE ARE</h3>

<div className="">
    <h2 className="text-4xl my-6">By Otakus, for Otakus</h2>
    <p className="text-xl text-slate-500 w-full md:w-10/12"> We are a team of anime lovers with the dream of bringing the ultimate anime experience to our fellow anime lovers.
     We are a team of anime lovers with the dream of bringing the ultimatte anime experience to our fellow anime lovers.
    We are a team of anime lovers with the dream of bringing the ultimatte anime experience to our fellow anime lovers</p>
</div>
                </div>
                 {/**left */}

                 <div className=" md:w-6/12 md:h-[34rem]  absolute left-52 sm:left-[26rem]  -top-32 lg:-top-10 md:relative md:inset-0">
                 <img src="/images/pokemon-image.png"  alt="pokemon-img" className="h-72 md:w-full md:h-full object-contain"/>
                 </div>

              </div>
               
            
            </section>

            {/**section 2 */}
            <section className="w-full flex flex-col-reverse lg:flex-row flex-wrap justify-center  bg-black py-10 md:py-20 ">

              
           


            <div className="flex flex-wrap justify-around md:items-center w-full lg:w-1/2 py-10 px-8">
                {/**Card */}
                {categories.map((values, index) => {
                  return (
                    <div className="flex  flex-col w-5/12 rounded-lg shadow-lg bg-white my-4 md:py-6 px-4 border-2" key={index}>
                      
                        <div className="w-full p-1 md:p-2 flex justify-center ">
                          <a
                            href="#!"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              className="rounded-t-lg block object-contain object-center px-5 py-1 h-24"
                              src={values.icon}
                              alt=""
                            />

                           
                          </a>
                        </div>
                      <div className="w-full flex flex-col items-center justify-center">
                      <h5 className="text-gray-900 text-xl font-medium mb-2 whitespace-nowrap">
                              {values.title}
                            </h5>
                            <p className="text-gray-700 text-sm mb-4">
                              {values.Quantity} Merch
                            </p>
                        </div>
                    
                    </div>
                  );
                })}
                {/**Card */}
              </div>

              <div className="flex flex-col w-full lg:w-1/2 text-center items-center">
              <h3 className="bg-neutral-100 text-red-500 font-bold mb-6 py-2 px-5 rounded-2xl my-4 w-fit ">WHAT WE DO</h3>

<h2 className="text-2xl text-white">Sections</h2>

<h4 className="text-xl text-white">Something about the sections</h4>
              </div>

            </section>

            {/* team section*/}
            <section className="my-10 py-10 md:py-20 xl:px-52 ">
              <div className="flex flex-col md:flex-row w-full px-12">
                 {/**left */}
                 <div className="md:w-5/12">
                <h3 className="bg-red-100/50 text-red-500 font-bold p-2 rounded-2xl mb-12 px-4 w-fit  ">OUR TEAM</h3>

<div className="my-8">
    <h2 className="text-4xl my-6">MEET THE TEAM</h2>
    <p className="text-xl text-slate-500"> A paragraph describing the team</p>
</div>
                </div>
                 {/**left */}

                 <div className="w-full md:w-7/12 justify-center flex flex-wrap">
                 {categories.map((_, index) => {
                  return (
                    <div className="flex flex-wrap flex-col  md:w-5/12 my-3 mx-2 relative" key={index}>
                      
                        <div className="w-full flex justify-center ">
                          
                            <img
                              className="rounded-3xl block object-cover object-center h-64"
                              src="/images/narutoKage.jpeg"
                              alt=""
                            />

                           
                        
                        </div>
                      <div className="w-3/5 flex flex-col items-center justify-center absolute bottom-6 right-0 bg-white/75 text-black">
                      <h5 className="text-gray-900 text-sm font-medium">
                              Naruto Uzumaki
                            </h5>
                            <p className="text-gray-700 text-sm">
                              Hokage
                            </p>
                        </div>
                    
                    </div>
                  );
                })}
                 </div>
              </div>

               

            </section>

           
           
        </div>
    )
}