import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Schema from "./schema";

export default function AdminPanel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data) => {
    fetch(`http://localhost:8000/${data.type}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });
  };

  const isType = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("type")}>
        <option value="vendor">Vendor</option>
        <option value="consignee">Consignee</option>
        <option value="warehouse">Warehouse</option>
      </select>

      <input placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input placeholder="Address" {...register("address")} />
      {errors.address && <p>{errors.address.message}</p>}

      <input placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input placeholder="Contact" {...register("contact")} />
      {errors.contact && <p>{errors.contact.message}</p>}

      {isType === "warehouse" && (
        <div>
          <input placeholder="password" {...register("Password")} />
        </div>
      )}

      <input type="submit" />
    </form>
  );
}
