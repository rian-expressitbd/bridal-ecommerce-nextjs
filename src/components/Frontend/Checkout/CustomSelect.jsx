import { useState } from 'react';

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="relative inline-block w-full mb-2">
      <p
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm md:text-base  text-gray-800 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-600"
      >
        {selectedOption || 'Select an option'}
        <span className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▼
        </span>
      </p>
      {isOpen && (
        <div className="absolute w-full mt-2  bg-white border text-sm md:text-base border-gray-300 rounded-md shadow-lg">
          <div
            onClick={() => handleSelect(' Cash on Delivery')}
            className="hover:bg-teal-600  hover:text-white text-gray-800 px-4 py-2 cursor-pointer"
          >
            Cash on Delivery
          </div>
          <div
            onClick={() => handleSelect('Paid')}
            className="hover:bg-teal-600 hover:text-white text-gray-800 px-4 py-2 cursor-pointer"
          >
            Paid
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
