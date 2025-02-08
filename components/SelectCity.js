import React, { useState } from "react";
import BackButton from "./Buttons/BackButton";
import { useFormContext } from "@/context/FormContext";
import { RxCross2 } from "react-icons/rx";
import { FaHospital } from "react-icons/fa";

const cities = [
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Delhi",
  "Goa",
  "Kochi",
  "Kolkata",
  "Mangalore",
  "Hyderabad",
];

const SelectCity = ({ onBack, onNext }) => {
  const { formData, setFormData } = useFormContext();
  const [inputValue, setInputValue] = useState(formData.city || "");

  const handleCityClick = (city) => {
    setInputValue(city);
    setFormData((prev) => ({ ...prev, city }));
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);

    const matchedCity = cities.find(
      (city) => city.toLowerCase() === inputText.toLowerCase()
    );

    setFormData((prev) => ({ ...prev, city: matchedCity || "" }));
  };

  const handleClearInput = () => {
    setInputValue("");
    setFormData((prev) => ({ ...prev, city: "" }));
  };

  return (
    <div className="min-w-[50vw] bg-slate-50 p-6 shadow-lg rounded-sm">
      <div>
        <div onClick={onBack}>
          <BackButton />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-center">Select Your City</h3>
      </div>

      <div className="relative w-full mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your city..."
          className="border border-gray-400 p-3 pr-10 rounded-md w-full text-center"
        />
        {inputValue && (
          <button
            onClick={handleClearInput}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
          >
            <RxCross2 size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cities.map((city) => (
          <div
            key={city}
            onClick={() => handleCityClick(city)}
            className={`cursor-pointer p-4 rounded-md text-center border border-slate-500 transition ${
              formData.city === city ? "bg-black text-white" : "bg-inherit"
            }`}
          >
            {city}
          </div>
        ))}
      </div>

      <div className="flex mr-2 p-3 w-full bg-white rounded-md mt-2">
        <FaHospital className="text-4xl" />
        <span>
          <p className="text-slate-500 text-xs">
            This will help us find the network of{" "}
          </p>
          <a href="#" className="text-semibold text-sm ">
            Cashless Hospitals in your city
          </a>
        </span>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onNext}
          disabled={!formData.city}
          className={`px-6 py-2 rounded-md w-full ${
            formData.city ? "bg-black text-white" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectCity;
