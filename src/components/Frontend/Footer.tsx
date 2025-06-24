import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className=' py-8'>
      <hr className='mb-6' />
      <div className='container mx-auto'>
        <div className='w-[90%] mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
            {/* Contact Section */}
            <div>
              <h6 className='font-bold  md:text-lg  mb-2'>Contact Us</h6>
              <a
                href='#'
                className='text-gray-600 text-sm  mb-1 hover:underline'
              >
                Location Goes Here
              </a>
              <a
                href='tel:+8801622185353'
                className='flex items-center mt-1 text-gray-600 hover:underline text-sm  '
              >
                <FaPhoneAlt className='mr-2' /> +880 1622185353
              </a>
              <a
                href='mailto:help@gmail.com'
                className='flex items-center mt-1 text-gray-600 hover:underline text-sm  '
              >
                <FaEnvelope className='mr-2' /> help@gmail.com
              </a>
            </div>
            {/* Information Section */}
            <div>
              <h6 className='font-bold  md:text-lg mb-2'>Information</h6>
              <ul>
                {[
                  "Return and Exchange",
                  "Privacy Policy",
                  "FAQs",
                  "Track Your Orders",
                  "Blogs",
                ].map((item) => (
                  <li className='mb-1' key={item}>
                    <a
                      href='#'
                      className='text-gray-600 hover:underline text-sm '
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Customer Care Section */}
            <div>
              <h6 className='font-bold  md:text-lg mb-2'>Customer Care</h6>
              <ul>
                {[
                  "About Us",
                  "Contact Us",
                  "Store Location",
                  "Terms and Conditions",
                ].map((item) => (
                  <li className='mb-1' key={item}>
                    <a
                      href='#'
                      className='text-gray-600 hover:underline text-sm '
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Newsletter Signup Section */}
            <div>
              <h6 className='font-bold  md:text-lg mb-2 whitespace-nowrap'>
                Signup For Our Newsletter
              </h6>
              <div className='flex mt-3 text-sm  '>
                <input
                  type='text'
                  placeholder='Search...'
                  className='border border-gray-300 rounded-l-md px-2 py-1 focus:outline-none focus:ring-2  hover:border-teal-500 hover:ring-1  transition duration-200'
                />
                <button className='bg-teal-600 text-white p-2 rounded-r-md hover:bg-teal-700 transition duration-200 focus:outline-none focus:ring-2  hover:border-teal-600 hover:ring-1'>
                  <FaSearch /> {/* Icon replaces the text */}
                </button>
              </div>

              <div className='flex gap-3 mt-3'>
                <a
                  href='https://www.facebook.com/attireidyllbd/'
                  aria-label='Facebook'
                  className='text-teal-600 hover:scale-125 transition-transform duration-300 ease-in-out'
                >
                  <FaFacebookF className=' ' />
                </a>
                <a
                  href='https://wa.me/8801632460342'
                  className='text-teal-600 hover:scale-125 transition-transform duration-300 ease-in-out'
                >
                  <FaWhatsapp className=' ' />
                </a>
                <a
                  href='https://www.instagram.com/attire_idyll/channel/'
                  aria-label='Instagram'
                  className='text-teal-600 hover:scale-125 transition-transform duration-300 ease-in-out'
                >
                  <FaInstagram className=' ' />
                </a>
              </div>
            </div>
          </div>
          {/* Footer Bottom Text */}
          <div className='mt-6 md:text-center mx-auto flex justify-center'>
            <div className='flex items-center gap-2'>
              <h3>&copy; {new Date().getFullYear()} All rights reserved</h3>
              <img
                className='w-[104px] h-[38px] mb-[15px]'
                alt='logo'
                src='/assets/logo.png'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
