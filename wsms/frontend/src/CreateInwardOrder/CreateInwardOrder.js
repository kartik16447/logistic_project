import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Calc from "./calc";
import Schema from "./schema";

export default function CreateOrderInward() {
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
  } = useForm({
    defaultValues: {
      item: [
        {
          name: "",
          unit: "",
          quantity: "",
          value: "",
        },
      ],
    },
    resolver: yupResolver(Schema),
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "item",
  });

  const onSubmit = (data) => {
    fetch("http://localhost:8000/order/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Order </h1>

      <input value={"inward"} type="hidden" {...register("nature")} />

      <input {...register("warehouseName", {})} placeholder="Warehouse" />
      {errors.warehouseName && <p>{errors.warehouseName.message}</p>}

      <input {...register("vendorName")} placeholder="Vendor" />
      {errors.vendorName && <p>{errors.vendorName.message}</p>}

      <div>
        <label>Dispatch date</label>
        <input
          type="datetime"
          {...register("dispatchDate", {})}
          placeholder="dd/mm/yy"
        />
      </div>
      {errors.dispatchDate && <p>Please submit a correct date</p>}

      <div>
        <label>Delivery date</label>
        <input
          type="datetime"
          {...register("deliveryDate", {})}
          placeholder="dd/mm/yy"
        />
      </div>
      {errors.deliveryDate && <p>{errors.deliveryDate.message}</p>}

      <ul>
        {fields.map((object, index) => {
          return (
            <li key={object.id}>
              <input
                defaultValue={`${object.name}`} // make sure to set up defaultValue
                {...register(`item[${index}].name`)}
                placeholder="Item"
              />

              <Controller
                name={`item[${index}].unit`}
                control={control}
                defaultValue={object.unit} // make sure to set up defaultValue
                render={({ field }) => <input {...field} placeholder="Units" />}
              />

              <Controller
                name={`item[${index}].quantity`}
                control={control}
                defaultValue={object.quantity} // make sure to set up defaultValue
                render={({ field }) => (
                  <input {...field} placeholder="Quantity" />
                )}
              />

              <Controller
                name={`item[${index}].value`}
                control={control}
                defaultValue={object.value} // make sure to set up defaultValue
                render={({ field }) => <input {...field} placeholder="Value" />}
              />

              <button type="button" onClick={() => remove(index)}>
                Remove item
              </button>
              {errors?.item?.[index] && (
                <p>Please submit proper details for this item</p>
              )}
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({
              name: "",
              unit: "",
              quantity: "",
              value: "",
            });
          }}
        >
          Add item
        </button>

        <button
          type="button"
          onClick={() =>
            reset({
              item: [
                {
                  name: "",
                  unit: "",
                  quantity: "",
                  value: "",
                },
              ],
            })
          }
        >
          Reset form
        </button>
      </section>
      {errors.item && <p>Please submit at least one item</p>}

      <Calc control={control} setValue={setValue} />
      <input {...register("totalValue")} readOnly />

      <input type="submit" value="Place order" />
    </form>
  );
}
