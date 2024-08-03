import { useDispatch, useSelector } from 'react-redux';
import logo from '../../../public/kettle.png';
import { auth } from "../../../src/firebase/Firebase";
import { loginUser } from "../../redux/features/userSlice";
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import avatar from '../../../public/avatar.png';
import logoutLogo from '../../../public/logout.png';

const Header = () => {

  const dispatch = useDispatch();
  const username = useSelector((state)=>state.data.user.user.username);

  const handleLogout = () => {
    dispatch(loginUser());
    signOut(auth);
  };

  return (
    <div className="bg-gray-100 text-gray-700 relative">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link>
          <img src={logo} alt="Logo" className="h-8" />
          </Link>
          <Link to={"/"}>
            <p className="font-bold">Algosium Blogs & Tea</p>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to={"/about"} className="hover:text-gray-300">About Us</Link>
            </li>
            <li>
              <Link to={"/write"} className="hover:text-gray-300">
                Write
              </Link>
            </li>
            {username && (

                <li className='md:flex gap-2 hidden'>
                  <img src={avatar} className='w-6' alt="" />
                  {username.charAt(0).toUpperCase() + username.slice(1)}
                </li>
              )}
            <li className='hidden lg:block'>
              <button
              className="hover:text-gray-300"
              onClick={handleLogout}
              >Sign Out</button>
            </li>
            <li className='lg:hidden'
            onClick={handleLogout}
            >
              <img src={logoutLogo} className='w-7 cursor-pointer' alt="" />
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00000f] via-[#672fe5] to-[#4933da]"></div>

      </div>
    </div>
  );
};

export default Header;
