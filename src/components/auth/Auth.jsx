import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import logo from '/public/logo.svg'
import './auth.css'

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="flex min-h-screen font-sans bg-[#f3f4f6]">
      <div className="flex-1  flex items-center justify-center">
        <div className="max-w-md ">
          <div className='flex flex-col items-center gap-4 mb-4'>
            <img src={logo} alt="" className='w-14'/>
            <p className='text-gray-700'>SDTECH (Formerly Studio Diseño)</p>
            <p className='text-gray-500 text-sm'>Blog site for SDTech, Post all about latest techs</p>

          </div>

          {showSignIn ? <SignIn /> : <SignUp />}
          <div className="text-center">
            <span>
              {showSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => setShowSignIn(!showSignIn)}
              >
                {showSignIn ? "Sign Up" : "Sign In"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
