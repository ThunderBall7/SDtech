import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    category: '',
    content: '',
  });

  const [thumbnail, setThumbnail] = useState();
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const docRef = doc(db, 'blogPost', postId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPostData({
            title: data.title,
            category: data.category,
            content: data.content,
          });
          setCurrentThumbnailUrl(data.thumbnail);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!postData.title || !postData.category || !postData.content) {
        console.log('Please fill in all fields.');
        return;
      }

      let updatedPostData = {
        title: postData.title,
        category: postData.category,
        content: postData.content,
      };

      if (thumbnail) {
        const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
        await uploadBytes(imageRef, thumbnail);
        const imageUrl = await getDownloadURL(imageRef);
        updatedPostData.thumbnail = imageUrl;
      }

      const postRef = doc(db, 'blogPost', postId);
      await updateDoc(postRef, updatedPostData);
      console.log('Post updated successfully!');
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={postData.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={postData.category}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={postData.content}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-400"
          rows="8"
        />
        <input
          type="file"
          name="thumbnail"
          onChange={handleThumbnailChange}
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-400"
        />
        {currentThumbnailUrl && (
          <img
            src={currentThumbnailUrl}
            alt="Thumbnail"
            className="w-24 h-24 object-cover rounded-md mb-4"
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
