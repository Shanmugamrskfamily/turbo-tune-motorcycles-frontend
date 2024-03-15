import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup";
import { apiContext } from "../App";
import { toast } from "react-toastify";
import { CustomLoadingButton } from "./customLoadingButton";
import { useNavigate } from "react-router";

function SignupForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { serverApi } = useContext(apiContext);
  const navigate = useNavigate();
  const { setForm } = props;
  const initialValidationSchema = {
    role: yup.string().required(),
    name: yup.string().required(),
    mobile: yup.string().min(10).required(),
    email: yup.string().min(8).email().required(),
    password: yup.string().min(8).required(),
    cpassword: yup
      .string()
      .min(8)
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    address: yup.string().min(10).required(),
    pin: yup.string().min(6),
    pins: yup.string().min(6),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        role: "",
        name: "",
        mobile: "",
        email: "",
        password: "",
        cpassword: "",
        address: "",
        pin: "",
        pins: "",
      },
      validationSchema: yup.object(initialValidationSchema),
      onSubmit: () => signup(values),
    });

  async function signup(values) {
    setIsLoading(true);
    const response = await fetch(`${serverApi}/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setIsLoading(false);
    if (data.message === "User Created, use the Activation link Sent on mail for Activation") {
      toast.success(data.message);
      // Reset the form after successful signup
      resetForm();
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="container">
    <h2 className="text-center mb-5">Signup Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Select your Role</label>
        <RadioGroup
          row
          aria-labelledby="user role radio"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.role && Boolean(errors.role)}
          helperText={touched.role && errors.role ? errors.role : null}
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="workshop" control={<Radio />} label="Workshop" />
        </RadioGroup>
        {touched.role && errors.role && <p className="text-danger">{errors.role}</p>}
      </div>

      <div className="mb-3 form-group">
        <TextField
          id="name"
          type="text"
          label="Name"
          name="name"
          className="form-control"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name ? errors.name : null}
        />
      </div>
      <div className="mb-3 form-group">
          <TextField
            id="mobile"
            type="text"
            label="Mobile"
            name="mobile"
            className="form-control"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobile && Boolean(errors.mobile)}
            helperText={touched.mobile && errors.mobile ? errors.mobile : null}
          />
          </div>
          <div className="mb-3 form-group">
          <TextField
            id="email"
            type="text"
            label="email"
            name="email"
            className="form-control"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          </div>
          <div className="mb-3 form-group">
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            className="form-control"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          </div>
          <div className="mb-3 form-group">
          <TextField
            id="cpassword"
            label="Confirm Password"
            type="password"
            name="cpassword"
            className="form-control"
            value={values.cpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.cpassword && Boolean(errors.cpassword)}
            helperText={
              touched.cpassword && errors.cpassword ? errors.cpassword : null
            }
          />
          </div>
          <div className="mb-3 form-group">
          <TextField
            multiline
            id="address"
            label={values.role === "workshop" ? "Shop Address" : "Address"}
            type="address"
            name="address"
            className="form-control"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && Boolean(errors.address)}
            helperText={
              touched.address && errors.address ? errors.address : null
            }
          />
          </div>

          {values.role === "workshop" ? (
            <div className="mb-3 form-group">
            <TextField
              multiline
              id="pins"
              label="Comma Separated Service Pincodes"
              type="pins"
              name="pins"
              className="form-control"
              value={values.pins}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.pins && Boolean(errors.pins)}
              helperText={touched.pins && errors.pins ? errors.pins : null}
            />
            </div>
          ) : (
            <div className="mb-3 form-group">
            <TextField
              id="pin"
              label="Pincode"
              type="pin"
              name="pin"
              className="form-control"
              value={values.pin}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.pin && Boolean(errors.pin)}
              helperText={touched.pin && errors.pin ? errors.pin : null}
            />
            </div>
          )}
<CustomLoadingButton
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          buttonComponent={
            <div className="text-center">
            <Button type="submit" variant="contained" className="btn-lg">
              Signup
            </Button>
            </div>
          }
        />
        <div className="text-center">
          <button className="btn btn-link" onClick={() => setForm("login")}>Already Have an Account?</button>
        </div>
      </form>
    </div>
  );
}

export { SignupForm };
