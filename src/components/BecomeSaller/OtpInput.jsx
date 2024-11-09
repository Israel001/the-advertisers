import React, { useState, useEffect } from "react";

const OtpInput = ({ onVerify, resendOtp, countdownStart = 60 }) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(countdownStart);
  const [isCounting, setIsCounting] = useState(true);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    onVerify(otp);
    setOtp(""); 
  };

  const handleResendOtp = () => {
    if (isCounting) return; 
    resendOtp();
    setCountdown(countdownStart);
    setIsCounting(true);
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-semibold">Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={handleOtpChange}
        maxLength={6}
        placeholder="Enter OTP"
        className="border border-gray-300 p-2 rounded w-32 text-center text-lg tracking-widest"
      />
      <button
        onClick={handleVerifyOtp}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
      >
        Verify OTP
      </button>
      <div className="flex items-center justify-center mt-4">
        {isCounting ? (
          <span className="text-sm text-gray-500">Resend in {countdown}s</span>
        ) : (
          <button
            onClick={handleResendOtp}
            className="text-blue-500 underline text-sm hover:text-blue-700"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpInput;
