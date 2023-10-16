import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  report_to: yup.string(),
});

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isReportToDisabled, setIsReportToDisabled] = useState(false);

  const nameValue = watch("name");
  

  const submitForm = (data:any) => {
    console.log(data);
  };

  // Disable the "report_to" field if the conditions are met
  React.useEffect(() => {
    if (nameValue === "CEO") {
      setIsReportToDisabled(true);
    } else {
      setIsReportToDisabled(false);
    }
  }, [nameValue]);

  return (
    <div className="Form  bg-slate-300 text-green-600 rounded-md w-3/4 h-96 flex flex-col gap-2 justify-center align-middle m-auto mt-24">
      <div className="title m-auto mb-4 mt-2 text-2xl font-semibold">
        Create Position
      </div>
      <div className="inputs flex flex-col m-auto mt-0 w-3/4">
        <form onSubmit={handleSubmit(submitForm)} className="rounded-lg flex flex-col gap-1">
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
            className="bg-green-600  shadow-green-300 shadow-lg text-white text-lg font-medium rounded-md p-1 mt-1 self-center w-48"
          />
        </form>
      </div>
    </div>
  );
}

export default Form;
