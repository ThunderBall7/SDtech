
import Home from "../Home";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "../AboutUs";
import WritePost from "../WritePost";
import Post from "../Post";
import EditPost from "../EditPost";

const Layout = () => {


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/write" element={<WritePost/>} />
          <Route path="/post/:postId" element={<Post/>} />
          <Route path="/edit-post/:postId" element={<EditPost />} />

        </Routes>
        <Footer />
      </Router>


    </>
  );
};

export default Layout;
