import { FaUsers, FaMapMarkerAlt, FaRegSmile } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-lg text-gray-700 text-center">30+ Employees</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FaMapMarkerAlt className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-lg text-gray-700 text-center">2 Locations</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FaRegSmile className="text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-lg text-gray-700 text-center">20+ Happy Clients</p>
        </div>
      </div>
      <div className="mt-12 lg:mb-52">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Our Culture</h3>
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          We foster a vibrant work culture that encourages creativity and innovation. Our team thrives in an environment that values collaboration, diversity, and continuous learning. Together, we strive to create exceptional experiences and drive meaningful change.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
