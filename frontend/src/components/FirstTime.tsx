import { useNavigate } from "react-router-dom";

//form import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


export default function FirstTime() { 


 const navigate = useNavigate();

   const submitHandler = () => {
     navigate("/create");
   };



  return (
    <div className="new flex flex-col justify-self-center mx-auto w-4/5 justify-items-center m-64">
      <div className="text-green-500 font-semibold text-6xl justify-items-center self-center">
        Create Hierarchy
      </div>
      <div className="flex gap-2 self-center justify-items-center my-3">
        <div className="font-semibold text-lg">
          Start Managing Your Company!{" "}
        </div>
      </div>
      <div
        onClick={submitHandler}
        className="self-center justify-center bg-green-500 w-fit p-1 rounded-sm text-lg text-white font-semibold hover:bg-green-800 hover:cursor-pointer flex pt-0"
      >
        Create
      </div>
    </div>
  );
}
