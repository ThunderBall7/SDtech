const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 lg:py-12 absolute w-full bg-gradient-to-r from-[#00000f] via-[#672fe5] to-[#4933da]">
      <div className="container mx-auto mt-[-14px] mb-[-14px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg lg:text-2xl font-bold mb-2">Inspiring better decisions</h3>
            <p className="mb-4 text-sm lg:text-base">
            with data-driven technologies</p>
            <p className="mb-4 text-sm lg:text-base">We are a bunch of smart and passionate people looking to 
              reinvent the possibilities when technology and Embracing Data-Driven Technologies for Informed Insights and Better Outcomes.</p>
          </div>
          <div>
            <h3 className="text-lg lg:text-2xl font-bold mb-4">Our Services</h3>
            <ul>
              <li className="mb-2 text-sm lg:text-base">Aritificial Intelligence</li>
              <li className="mb-2 text-sm lg:text-base">Data Science</li>
              <li className="mb-2 text-sm lg:text-base">Digital Product Engineering</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg lg:text-2xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2 text-sm lg:text-base">Email: manish.maurya@algosium.com</p>
            <p className="mb-2 text-sm lg:text-base">Phone: No Calls!</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
