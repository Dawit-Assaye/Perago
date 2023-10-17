import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  report_to: yup.string()
});
type FormValues={
  name:string
  description:string
}

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitSuccessful },
    watch,
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isReportToDisabled, setIsReportToDisabled] = useState(false);

  const nameValue = watch("name");
  const reporttoValue = watch("report_to");
  

  const submitForm = async (data: FormValues) => {
    try {
     
      const response = await axios.post("http://localhost:3001/position/root", data);
      console.log("Form Submitted", data);
      console.log("Response from the API:", response.data);

      toast.success("Form submitted successfully", {
        position: "top-right",
        autoClose: 3000, 
      });

      reset();
    } catch (error) {
      console.error("Error submitting the form:", error);
     
      toast.error("An error occurred while submitting the form", {
        position: "top-right",
        autoClose: 3000, 
      });
    }
  }


  React.useEffect(() => {
    if (nameValue === "CEO" || reporttoValue ===  "Chiefe Executive Officer" ) {
      setIsReportToDisabled(true);
    } else {
      setIsReportToDisabled(false);
    }

    if(isSubmitSuccessful){
      reset();
    }
  }, [nameValue,isSubmitSuccessful,reset]);

  return (
    <div className="container ">
      <ToastContainer />
      <div className="Form bg-slate-300 text-green-600 rounded-md w-2/5 h-96 flex flex-col gap-2 justify-center align-middle m-auto mt-24">
        <div className="title m-auto mb-4 mt-2 text-2xl font-semibold">
          Create Position
        </div>
        <div className="inputs flex flex-col m-auto mt-0 w-3/4">
          <form
            onSubmit={handleSubmit(submitForm)}
            className="rounded-lg flex flex-col gap-1"
          >
            <input
              className="w-full rounded-md h-16 p-2 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
              type="text"
              {...register("name")}
              placeholder="Name..."
            />
            <p className="text-green-800">{errors.name?.message}</p>
            <input
              className="w-full rounded-md h-16 p-2 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
              type="text"
              {...register("description")}
              placeholder="Description..."
            />
            <p className="text-green-800">{errors.description?.message}</p>
            <input
              className="w-full rounded-md h-16 p-2 focus:outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
              type="text"
              {...register("report_to")}
              placeholder="Report to..."
              disabled={isReportToDisabled}
            />
            <p className="text-green-800">{errors.report_to?.message}</p>
            <input
              type="submit"
              className="bg-green-600  shadow-green-300 shadow-sm text-white text-lg font-medium rounded-md p-1 mt-1 self-center w-48"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
