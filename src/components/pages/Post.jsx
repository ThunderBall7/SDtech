import { arrayUnion, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../../components/loader/Loader'
import { useSelector } from "react-redux";
import Heart from './images/heart.svg';

const Post = () => {
  const [postData, setPostData] = useState(null);
  const { postId } = useParams();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(postData);
  const navigate = useNavigate();

  const currentUser = useSelector((state)=>state.data.user.user.username);


  const handleDelete = async () => {
    try {
      if (currentUser === postData.username) {
        await deleteDoc(doc(db, 'blogPost', postId));
        console.log('Post deleted successfully');
        navigate('/');
      } else {
        console.log('not auathorizedd..');
      }
    } catch (error) {
      console.error('delete error', error);
    }
  };

  const handleEdit = () => {
    if (currentUser === postData.username) {
      navigate(`/edit-post/${postId}`);
    } else {
      console.log('not authorized');
    }
  };


  const handleLike = async () => {
    if (!isLiked) {
      try {
        const postRef = doc(db, 'blogPost', postId)
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser),
        });
        setLikes(likes + 1);
        setIsLiked(true);
      } catch (error) {
        console.error('Error liking:', error);
      }
    } else {
      console.log('linked already');
    }
  };


  const handleComment = async () => {
    if (commentText.trim() !== '') {
      try {
        const commentRef = doc(db, 'blogPost', postId);
        await updateDoc(commentRef, {
          comments: arrayUnion({ username: currentUser, text: commentText })
        });
        setCommentText('');
      } catch (error) {
        console.error('Error comment:', error);
      }
    }
  };


    useEffect(() => {
      const fetchPostData = async () => {
        try {
          const docRef = doc(db, "blogPost", postId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const postData = docSnap.data();
            setPostData(postData);
            setLoading(false);
          } else {
            console.log("error, no data");
          }
        } catch (error) {
          console.error("post not available", error);
        }
      };

      fetchPostData();
    }, [postId]);

    useEffect(() => {
      const unsubscribe = onSnapshot(doc(db, "blogPost", postId), (doc) => {
        if (doc.exists()) {
          const postData = doc.data();
          setPostData(postData);
          setComments(postData.comments || []);
        } else {
          console.log("error, no data");
        }
      });

      return () => unsubscribe();
    }, [postId]);

    useEffect(() => {
      if (postData) {
        setComments(postData.comments);
      }
    }, [comments]);


  return (
    loading ? (
      <Loader />
    ) : (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
        <p className="text-gray-500 mb-2 text-xl">{postData.category}</p>
        <p className="text-gray-800 text-md mb-4">{postData.content}</p>
        <img src={postData.thumbnail} alt="Post" className="w-full rounded-lg mb-4" />

        <div className="mt-4 flex justify-between">
          <div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex justify-center items-center gap-2"
            onClick={handleLike}>
              <img src={Heart} alt="" />
              <span>{(postData.likes && postData.likes.length) || 0}</span>
            </button>
          </div> <br />
          { postData.username === currentUser &&
            <div className="flex gap-3 mb-8">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={handleDelete}>
              Delete
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-red-600"
            onClick={handleEdit}>
              Edit
            </button>
          </div>}
        </div>
        <div>
          <div  className="flex gap-2 mb-4">
            <button
            onClick={handleComment}
            className="border bg-blue-400 hover:bg-blue-500 rounded-md p-1"
            >Comment</button>
            <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border px-2"
            ></textarea><br />
            </div>
        <div>
          <h3 className="border-b-4 mb-2">Comments:</h3>
          {comments && comments.map((comment, index) => (
            <div key={index}>
              <p>{String(comment.username)}: {String(comment.text)}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    )
  );
};

export default Post;
