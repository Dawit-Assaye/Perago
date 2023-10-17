import { useNavigate } from "react-router-dom";

export default function FirstTime() { 

 const navigate = useNavigate();

   const submitHandler = () => {
     navigate("/create");
   };

  return (
    <div className="new flex flex-col justify-self-center mx-auto w-4/5 justify-items-center">
    <div className="text-green-500 font-semibold text-5xl justify-items-center self-center">
      Create Hierarchy
    </div>
    <div className="flex gap-2 self-center justify-items-center my-3">
    <div className="font-semibold text-sm">
      Start Managing Your Company!{" "}
    </div>
      <div onClick={submitHandler} className=" bg-green-500 w-fit p-1 rounded-sm text-lg text-white font-semibold hover:bg-green-800 hover:cursor-pointer flex pt-0">Create</div>
      </div>
  </div>
  )
}
