const Footer = () => {

  return (

    <footer className="bg-gray-900 text-white py-12 absolute bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">WE DONT JUST DESIGN</h3>
            <p className="mb-6">WE DEFINE EXPERIENCES</p>
            <p className="mb-6">We are a bunch of smart and passionate people looking to reinvent the possibilities when technology and design meet.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Services</h3>
            <ul>
              <li className="mb-3">Mobile Apps (Native and Hybrid)</li>
              <li className="mb-3">Front-end Web Development</li>
              <li className="mb-3">Enterprise Applications</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
