import PropTypes from 'prop-types';
import './style.css';
import heart from './images/heart.svg'
import comment from './images/comment.svg'
import like from './images/like.svg'
import {useNavigate } from 'react-router-dom';


const Card = ({ title, category, content, imageUrl, postId, date, username, likes, comments }) => {

  const navigate = useNavigate();

  const handleClick = (postId) => {
    navigate(`/post/${postId}`)
  };

  return (
    <div className="flex items-center justify-center mb-3 ">
      <div
      className="p-4 items-center justify-center w-[680px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl mt-4 cursor-pointer"
      onClick={() => handleClick(postId)}
      >
        <img
          className="mx-auto block w-4/12 h-40 rounded-lg"
          alt="art cover"
          loading="lazy"
          src={imageUrl}
        />
        <div className="sm:w-8/12 pl-0 p-5">
          <div className="space-y-2">
            <div className="space-y-4 flex justify-between">
              <h4 className="text-md font-semibold text-cyan-900 text-justify">
                {title}
              </h4>
              {username && (
                <h4 className='text-md font-semibold text-cyan-900 text-justify transform -translate-y-4'>
                  {username.charAt(0).toUpperCase() + username.slice(1)}
                </h4>
              )}
            </div>
            <div className="flex items-center space-x-4 justify-between">
              <div className="space-y-1 ">
                <p className="text-sm max-h-28 content ">{content}</p>
              </div>
              <div className="px-3 py-1 rounded-lg flex space-x-2 flex-row">
                <div className="cursor-pointer text-center text-md justify-center items-center flex">
                  <img src={heart} alt="" />
                  <span className="text-md mx-1">{likes || 0}</span>
                </div>
                <div className="cursor-pointer text-center text-md justify-center items-center flex">
                  <img src={comment} alt="" />
                  <span className="text-md mx-1">{comments || 0}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 justify-between">
              <div className="text-grey-500 flex flex-row space-x-1 my-4">
              <svg
                  stroke="currentColor"
                  fill="#000000"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="0.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                <p className="text-xs">{category}</p>
                <p className="text-xs">{date}</p>
                </div>
              </div>
              <div className="flex flex-row space-x-1">
                <div className="bg-green-500 shadow-lg shadow-green-600 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row">
                  <img src={like} alt="" />
<span>{likes || 0}</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

);
};

Card.propTypes = {
title: PropTypes.string.isRequired,
category: PropTypes.string.isRequired,
content: PropTypes.string.isRequired,
imageUrl: PropTypes.string,
postId: PropTypes.string,
date: PropTypes.string,
username: PropTypes.string,
likes: PropTypes.number,
comments: PropTypes.number,
};

export default Card;
