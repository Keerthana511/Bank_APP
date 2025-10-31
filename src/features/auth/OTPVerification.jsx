import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); // countdown for resend
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const [email, setEmail] = useState(""); // ✅ Load mock user email from previous step

  useEffect(() => {
    const pendingUser = JSON.parse(localStorage.getItem("pendingUser"));
    if (pendingUser?.email) setEmail(pendingUser.email);
    generateOtp();
  }, []); // ✅ Countdown timer

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendAvailable(true);
      return;
    }
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtp("");
    setError("");
    setSuccess("");
    setTimeLeft(30);
    setIsResendAvailable(false);

    console.log("🔐 Mock OTP (for demo):", newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp === generatedOtp) {
      setSuccess("✅ OTP Verified Successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setError("❌ Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    if (isResendAvailable) generateOtp();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-96 text-center"
      >
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">
          OTP Verification
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Enter the 6-digit OTP sent to
          <span className="font-semibold text-gray-800"> {email}</span>
        </p>
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter OTP"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
        <div className="mt-4 text-sm text-gray-600">
          {isResendAvailable ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 hover:underline font-medium"
            >
              Resend OTP
            </button>
          ) : (
            <p>Resend available in {timeLeft}s</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default OTPVerification;
