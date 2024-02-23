import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/Firebase";
import { toast } from "react-toastify";

const SignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogIn = async() => {
    if(!email || !password) {
      return toast.error("Fill all the requiered fields")
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast.error('Email or Password is incorrect');
      // alert("Email or Password is incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="w-full max-w-md">
        <div className=" px-8 pt-6 pb-8">
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-[270px] lg:w-96 py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-300"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-[270px] lg:w-96 py-2 px-3 text-gray-500 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-300"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline font-medium"
              type="button"
              onClick={handleLogIn}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
