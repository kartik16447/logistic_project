import * as yup from "yup";

// No item errors are given in the schema so as not to overwhelm the user with
// multiple error messages for every wrongly entered item
const Schema = yup.object().shape({
  sendersName: yup.string().required("Please submit sending warehouse name"),
  receiversName: yup.string().required("Please submit reciver's name"),
  dispatchDate: yup
    .date("Please submit a correct date")
    .typeError("Please submit a valid date")
    .required("Please submit a dispatch date"),
  deliveryDate: yup
    .date("Please submit a delivery date")
    .typeError("Please submit a valid date")
    .min(
      yup.ref("dispatchDate"),
      "Delivery date cannot be before dispatch date"
    )
    .required("Please submit a delivery date"),
  item: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        name: yup.string().required(),
        unit: yup.string().required(),
        quantity: yup.number().positive().integer().required(),
        value: yup.number().positive().required(),
      })
    ),
});

export default Schema;
