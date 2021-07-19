// import React, { Component } from "react";
// import {
//   Row,
//   FormGroup,
//   FormControl,
//   FormLabel,
//   Button,
// } from "react-bootstrap";
// import { isEmail, isEmpty, isLength, isContainWhiteSpace } from "./validator";

// class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       formData: {}, // Contains login form data
//       errors: {}, // Contains login field errors
//       formSubmitted: false, // Indicates submit status of login form
//       loading: false, // Indicates in progress state of login form
//     };
//   }

//   handleInputChange = (event) => {
//     const target = event.target;
//     const value = target.value;
//     const name = target.name;

//     let { formData } = this.state;
//     formData[name] = value;

//     this.setState({
//       formData: formData,
//     });
//   };

//   validateLoginForm = (e) => {
//     let errors = {};
//     const { formData } = this.state;

//     if (isEmpty(formData.email)) {
//       errors.email = "Email can't be blank";
//     } else if (!isEmail(formData.email)) {
//       errors.email = "Please enter a valid email";
//     }

//     if (isEmpty(formData.password)) {
//       errors.password = "Password can't be blank";
//     } else if (isContainWhiteSpace(formData.password)) {
//       errors.password = "Password should not contain white spaces";
//     } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
//       errors.password = "Password's length must between 6 to 16";
//     }

//     if (isEmpty(errors)) {
//       return true;
//     } else {
//       return errors;
//     }
//   };

//   login = (e) => {
//     console.log("logging in");
//     fetch("http://localhost:8000/login", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify(this.formData),
//     })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   render() {
//     const { errors, formSubmitted } = this.state;

//     return (
//       <div className="Login">
//         <Row>
//           <form onSubmit={this.login}>
//             <FormGroup
//               controlId="email"
//               validationState={
//                 formSubmitted ? (errors.email ? "error" : "success") : null
//               }
//             >
//               <FormLabel>Email</FormLabel>
//               <FormControl
//                 type="text"
//                 name="email"
//                 placeholder="Enter your email"
//                 onChange={this.handleInputChange}
//               />
//             </FormGroup>
//             <FormGroup
//               controlId="password"
//               validationState={
//                 formSubmitted ? (errors.password ? "error" : "success") : null
//               }
//             >
//               <FormLabel>Password</FormLabel>
//               <FormControl
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 onChange={this.handleInputChange}
//               />
//             </FormGroup>
//             <Button type="submit" bsStyle="primary">
//               Sign-In
//             </Button>
//           </form>
//         </Row>
//       </div>
//     );
//   }
// }

// export default Login;
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";

export default function Login() {
  // Default values absolutely needs to be supplied
  // See tips section under React hook form v7 controller
  // https://react-hook-form.com/api/usecontroller/controller
  // const [cookie, setCookie] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, "ircs secret", {
      expiresIn: maxAge,
    });
  };

  const onSubmit = (data) => {
    console.log("Logging in...");
    fetch("/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(
        function (data) {
          console.log(data);
          const token = createToken(data.user);
          cookie.save("jwt", token);
          // setCookie(data["jwt"]);
        }.bind(this)
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login </h1>

      <input {...register("username")} placeholder="Username" />

      <input {...register("password")} placeholder="Password" />

      <input type="submit" value="Login" />
    </form>
  );
}
