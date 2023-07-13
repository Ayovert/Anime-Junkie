interface Props {
  stepItems: string[];
  activeStep: number;
}

export default function CustomStepper({ stepItems, activeStep }: Props) {
  return (
    <div className="p-5 w-full md:w-3/5">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          {stepItems.map((label, index) => {
            return (
              <div className={`flex items-center ${
                stepItems.length - 1 === index ? "w-fit" : "w-full"
              }`} key={index}>
                <div
                  className={`flex items-center ${
                    activeStep === index ? "text-white " : "text-teal-600"
                  } relative`}
                >
                  <div
                    className={` flex items-center justify-center rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                      activeStep === index ? "bg-teal-600 " : "none"
                    }  border-teal-600`}
                  >
                    {index}
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
                    {label}
                  </div>
                </div>
                <div
                  className={`${
                    stepItems.length - 1 === index ? "hidden" : "block"
                  } flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
