import './style.css';
import kettle from '/public/kettle.png'


const Loader = () => {
  return (
    <div className="loader-container bg-gray-100 ">
      <img src={kettle} style={{width:'100px'}} alt="" className="loader-svg" />
    </div>
  );
};

export default Loader;
