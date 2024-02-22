import { useEffect, useState } from "react";
import {Timestamp, addDoc, collection} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import './style.css'
import { useSelector } from "react-redux";

const WritePost = () => {

  const username = useSelector((state)=>state.data.user.user.username);

  const [postData, setPostData] = useState({
    title: '',
    category: '',
    content: '',
    time: Timestamp.now(),
    username: '',
});

  const [thumbnail, setThumbnail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setPostData((prevData) => ({ ...prevData, username: username }));
  }, []);



  console.log(username);

  const addPost = async (e) => {
    e.preventDefault();

    try {
      if (!thumbnail || postData.title === "" || postData.category === "" || postData.content === "") {
        console.log('Please fill in all fields and select a thumbnail.');
        return;
      }

      const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
      const snapshot = await uploadBytes(imageRef, thumbnail);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const productRef = collection(db, "blogPost");
      await addDoc(productRef, {
        title: postData.title,
        username: postData.username,
        category: postData.category,
        content: postData.content,
        thumbnail: imageUrl,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });

      setPostData({
        title: '',
        category: '',
        content: '',
        username: username,
        time: Timestamp.now(),
      });
      setThumbnail(null);

      navigate('/');
      console.log('Post Added Successfully');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  }




  return (
  <div className="w-full max-w-lg mx-auto lg:mb-64 p-6 bg-white ">
  <h2 className="text-2xl font-bold mb-5 text-gray-500">Write Post</h2>
  <form onSubmit={addPost}>
    <div className="relative">

    <input
      type="text"
      name="title"
      placeholder="Title"
      value={postData.title}
      onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      className="w-full mb-4 p-2 focus:border border-gray-300 rounded-md focus:outline-none focus:border-gray-200 text-4xl "
    />
    <span className="input-line"></span>

    </div>
    <input
      type="text"
      name="category"
      placeholder="Category"
      value={postData.category}
      onChange={(e) => setPostData({ ...postData, category: e.target.value })}
      className="w-full mb-4 p-2 focus:border border-gray-300 rounded-md focus:outline-none focus:border-gray-200 text-xl"
    />
    <textarea
      name="content"
      placeholder="Write your story"
      value={postData.content}
      onChange={(e) => setPostData({ ...postData, content: e.target.value })}
      className="w-full mb-4 p-2 focus:border border-gray-300 rounded-md focus:outline-none focus:border-gray-200 text-lg"
    />
    <input
      type="file"
      name="thumbnail"
      onChange={(e) => setThumbnail(e.target.files[0])}
      className="w-full mb-4 p-2 focus:border border-gray-300 rounded-md focus:outline-none focus:border-gray-200 text-sm"
    />
    <button
      type="submit"
      className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
    >
      Submit
    </button>
  </form>
</div>
);
}


export default WritePost