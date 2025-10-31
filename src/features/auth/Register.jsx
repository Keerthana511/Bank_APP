import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(form.password))
      newErrors.password = "Password must contain an uppercase letter";
    else if (!/[a-z]/.test(form.password))
      newErrors.password = "Password must contain a lowercase letter";
    else if (!/[0-9]/.test(form.password))
      newErrors.password = "Password must contain a number";
    else if (!/[@$!%*?&#]/.test(form.password))
      newErrors.password = "Password must contain a special character";

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return; //  Save user to localStorage

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const alreadyExists = existingUsers.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    );
    if (alreadyExists) {
      setErrors({ email: "User with this email already exists" });
      return;
    }
    existingUsers.push({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setSuccess("✅ Registration successful! You can now log in.");
    setForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Register – ABC Bank
        </h2>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName}</p>
        )}
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        />
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-2 rounded"
          maxLength="10"
        />
                   {" "}
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                 {" "}
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <label className="block mb-1 font-medium">Confirm Password</label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
        {success && (
          <p className="text-green-600 text-center mt-3">{success}</p>
        )}
        <p className="mt-4 text-sm">
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
