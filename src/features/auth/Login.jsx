import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, setOtpSent } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { rms } from "../../utils/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const nav = useNavigate(); // ✅ Validation function

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }; // ✅ Handle Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]"); // Check for customer and RM in one go

    const existingUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    const existingRM = rms.find(
      (rm) =>
        rm.email.toLowerCase() === email.toLowerCase() &&
        rm.password === password
    );

    if (existingUser) {
      localStorage.setItem("pendingUser", JSON.stringify(existingUser));
      dispatch(
        loginSuccess({
          user: { email },
          role: "Customer",
          token: "mock-token",
        })
      );
      dispatch(setOtpSent(true));
      nav("/otp"); // ✅ navigate immediately
    } else if (existingRM) {
      localStorage.setItem("pendingUser", JSON.stringify(existingRM));
      dispatch(
        loginSuccess({
          user: { email },
          role: "RM",
          token: "mock-token",
        })
      );
      dispatch(setOtpSent(true));
      nav("/otp"); // ✅ single click navigation
    } else {
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
           {" "}
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
               {" "}
        <h2 className="text-xl font-semibold mb-4 text-primary">
                    ABC Bank — Login        {" "}
        </h2>
               {" "}
        {errors.general && (
          <p className="text-red-500 text-sm text-center mt-2">
                        {errors.general}         {" "}
          </p>
        )}
               {" "}
        <form onSubmit={handleSubmit} className="space-y-4">
                   {" "}
          {errors.email && (
            <p className="text-red-500 text-sm mb-2">{errors.email}</p>
          )}
                   {" "}
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
                   {" "}
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}
                   {" "}
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-2 border rounded"
          />
                   {" "}
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded"
          >
                        Sign In          {" "}
          </button>
                 {" "}
        </form>
               {" "}
        <p className="mt-4 text-sm">
                    Not registered?          {" "}
          <a href="/register" className="text-primary">
                        Register          {" "}
          </a>
                 {" "}
        </p>
             {" "}
      </div>
         {" "}
    </div>
  );
}
