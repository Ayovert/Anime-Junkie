import { useAppSelector } from "../../../shared/redux/store";

export default function PersonalInfo() {
  const {user,userAddress} = useAppSelector((state) => state.user);

  return (
    <div className="mb-14 w-full md:w-3/4">
      <h4 className="text-xl font-bold">Personal Information</h4>

      {/**Avatar */}
      <div className="my-4 items-center overflow-hidden">
        <img
          className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>

      {/**pers Info */}
      <div className="mt-9 flex">
        {/**Full Name * Phone **/}

        <div className="flex flex-col justify-between w-full ">
          <div className="flex flex-col w-4/5 md:w-1/2 my-2">
            <span className="text-sm opacity-40 "> Full Name</span>

            <span className="text-base "> {userAddress?.fullName ?? "N/A"}</span>
          </div>

          <div className="flex flex-col w-4/5 md:w-1/2 my-2">
            <span className="text-sm opacity-40 "> Email</span>

            <span className="text-base "> {user?.email ?? "N/A"}</span>
          </div>
        </div>

        {/**Full Name * Phone **/}

        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col w-4/5 md:w-1/2 my-2">
            <span className="text-sm opacity-40"> Phone Number</span>

            <span className="text-base">  {userAddress !== null ? `(234) ${userAddress.telephone}` :"N/A"}</span>
          </div>

          <div className="flex flex-col w-4/5 md:w-1/2 my-2">
            <span className="text-sm opacity-40"> Location</span>

            <span className="text-base"> {userAddress !== null ? `${userAddress.city}, ${userAddress.state}` : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
