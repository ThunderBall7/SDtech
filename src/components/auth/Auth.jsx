import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import kettle from '/public/kettle.png'
import './auth.css'

const Auth = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className='bg-[#f3f4f6]'>
    <div className="flex h-screen font-sans]">
      <div className="flex-1  flex items-center justify-center">
        <div className="max-w-md ">
          <div className='flex flex-col items-center gap-4 mb-4'>
            <img src={kettle} alt="" className='w-16'/>
            <p className='text-gray-700'>Algosium Blogs and Tea</p>
            <p className='text-gray-500 text-sm'>Share whatever you feel like! Literally whatever!</p>

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
    </div>
  );
};

export default Auth;
