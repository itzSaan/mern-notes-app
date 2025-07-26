import { useState, useRef } from 'react'
import { useNavigate} from 'react-router-dom'

const ResetPassword = () => {

  const navigate = useNavigate();
  const inputRefs = useRef([]);
    const [emailVerify, setEmailVerify] = useState("");
    const [otpVerify, setOtpVerify] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
  
    const handleInput = (e, index) => {
      if (e.target.value.length > 0 && index <inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    const handleKeyDown = (e, index) => {
      if(e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }

    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text');
      const pasteArr = paste.split('');
      pasteArr.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    };

    const onsubmitEmail = async (e) => {
      e.preventDefault();
      try {
        
      } catch (error) {
        
      }       
    }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-700 from-50% to-blue-200 to-50%">
      <div className="w-[24rem] bg-white dark:bg-[#0e121a] dark:text-neutral-200 rounded-xl px-6 py-8 shadow-xl">
       
{/* Email verify form */}
{ !emailVerify && 

        <form onSubmit={onsubmitEmail}>          
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify Email
        </h2>
        <p className="text-sm dark:text-neutral-400 text-center mb-6">
          Enter your registered email id
        </p>
          <div className="flex items-center  gap-2 relative mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="relative p-4 pl-12 border border-gray-300 dark:border-[#222531] bg-transparent w-full rounded-lg"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute text-gray-500 inset-4 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="relative p-4 bg-blue-600 text-white w-full rounded-lg mb-4"
          > Verify Email
          </button>
        </form>
      }

        {/* OTP  verify form */}
        { emailVerify && !otpVerify && 
        <form onSubmit={onsubmitOtp}>          
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-sm dark:text-neutral-400 text-center mb-6">
          Enter the OTP sent to your email
        </p>
          <div className="flex items-center w-full  gap-2 relative mb-4" onPaste={handlePaste}>
            {Array(6).fill('_').map((el, i) => (
              <input
              key={i}
              type="text"
              placeholder="0"
              ref={(e) => (inputRefs.current[i] = e)}
              onInput={(e)=> handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              // onChange={(e) => setEmail(e.target.value)}
              maxLength={1}
              className="relative p-2 text-2xl text-center border border-gray-300 dark:border-[#222531] bg-transparent w-full rounded-lg"
              required
            />
            ))}
          </div>
          <button
            type="submit"
            className="relative p-4 bg-blue-600 text-white w-full rounded-lg mb-4"
          > Verify OTP
          </button>
        </form>
}


        {/* Password reset form */}
        {emailVerify && otpVerify && 
        <form onSubmit={onsubmitNewPassword}>          
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h2>
        <p className="text-sm dark:text-neutral-400 text-center mb-6">
          Enter your new password
        </p>
          <div className="flex items-center  gap-2 relative mb-4">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="relative p-4 pl-12 border border-gray-300 dark:border-[#222531] bg-transparent w-full rounded-lg"
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.25}
              stroke="currentColor"
              className="absolute text-gray-500 inset-4 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </div>

          <button
            type="submit"
            className="relative p-4 bg-blue-600 text-white w-full rounded-lg mb-4"
          > Reset Password
          </button>
        </form>
}
      </div>
    </div>
  );
}

export default ResetPassword