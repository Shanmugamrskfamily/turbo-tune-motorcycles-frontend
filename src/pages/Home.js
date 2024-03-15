import { useState } from "react";
import { ForgotForm } from "../components/ForgotForm";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

function Home() {
  const [form, setForm] = useState("login");
  const homeImage = {
    url: "https://media.istockphoto.com/id/614415432/photo/this-bike-will-be-perfect.jpg?s=612x612&w=0&k=20&c=ocm2We_PX3gWAz5UtdHlC2Ns5L43_A-OAK2a1jtnBV0=",
    name: "MotorCycle Repair Logo",
  };
  return (
    <div className="container">
    <h1 className="text-center mb-5" style={{ color: "#007bff", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>Turbo Tune Motorcycles App</h1>
    <div className="row">
      <div className="col-md-6 offset-md-3 text-center mb-4">
        <img src={homeImage.url} alt={homeImage.name} className="img-fluid" />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        {form === "login" ? (
          <LoginForm form={form} setForm={setForm} />
        ) : form === "signup" ? (
          <SignupForm form={form} setForm={setForm} />
        ) : form === "forgot" ? (
          <ForgotForm form={form} setForm={setForm} />
        ) : null}
      </div>
    </div>
  </div>
  
  );
}
export { Home };
