import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { apiContext } from "../App";
import { CustomLoadingButton } from "./customLoadingButton";

function LoginForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setForm } = props;
  const { serverApi } = useContext(apiContext);
  const navigate = useNavigate();
  const initialValidationSchema = {
    email: yup.string().min(8).email(),
    password: yup.string().min(8),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => login(values),
    });

  const login = async (values) => {
    try {
      setIsLoading(true);
    const response = await fetch(`${serverApi}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      setIsLoading(false);
      data.role === "workshop" ? navigate("/workshop") : navigate("/user");
    } else {
      toast.error('Invalid User Email or Password!');
      setIsLoading(false);
    }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <>
      <div className="login-form-container">
        <h2 style={{ textAlign: "center", marginBottom: "5px", color: "orange", fontFamily: "'Arial', sans-serif", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            type="text"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : null}
            className="form-control mb-3"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
            className="form-control mb-3"
          />

          <CustomLoadingButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            buttonComponent={
              <div className="text-center">
              <Button type="submit" variant="contained" className="btn btn-primary btn-lg">
                Login
              </Button>
              </div>
            }
          />
          <div className="text-center">
            <button
              className="btn btn-link text-danger"
              onClick={() => setForm("forgot")}
            >
              Forgot password?
            </button>
            <button
              className="btn btn-link text-primary"
              onClick={() => setForm("signup")}
            >
              Don't have an account? Sign Up
            </button>
          </div>
          <div className="text-center mt-3">
            <Button
              type="button"
              variant="contained"
              color="success"
              className="me-2"
              onClick={() =>
                login({ email: "demo_user@gmail.com", password: "12345678" })
              }
            >
              Demo User-Login
            </Button>
            <Button
              type="button"
              variant="contained"
              className="ms-2"
              onClick={() =>
                login({ email: "admin@turbotunemotorcycles.com", password: "87654321" })
              }
            >
              Demo Workshop-Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export { LoginForm };
