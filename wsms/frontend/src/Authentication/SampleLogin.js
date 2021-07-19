import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  // Default values absolutely needs to be supplied
  // See tips section under React hook form v7 controller
  // https://react-hook-form.com/api/usecontroller/controller

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // fetch("http://localhost:8000/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Order </h1>

      <input {...register("username")} placeholder="Username" />

      <input {...register("password")} placeholder="Password" />

      <input type="submit" value="Login" />
    </form>
  );
}
