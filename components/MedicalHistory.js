import React, { useState, useEffect } from "react";
import BackButton from "./Buttons/BackButton";
import { useFormContext } from "@/context/FormContext";
import { HiLightBulb } from "react-icons/hi";

const medicalOptions = [
  "Diabetes",
  "Blood Pressure",
  "Heart Rate",
  "Any Surgery",
  "Thyroid",
  "Asthma",
  "Other Diseases",
  "None of These",
];

const MedicalHistory = ({ onBack, onNext }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedOptions, setSelectedOptions] = useState(
    formData.medicalHistory || []
  );

  useEffect(() => {
    // Save selected medical history to formData & local storage
    setFormData((prev) => ({ ...prev, medicalHistory: selectedOptions }));
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...formData, medicalHistory: selectedOptions })
    );
  }, [selectedOptions, setFormData]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="min-w-[50vw] bg-white p-6 shadow-lg rounded-sm">
      <div>
        <div onClick={onBack}>
          <BackButton />
        </div>

        <h3 className="text-2xl font-bold mb-4 text-center">Medical History</h3>
        <p className="text-sm text-slate-400 p-5">
          Do any member(s) have an existing illness for which they take regular
          medication?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        {medicalOptions.map((option, index) => (
          <label
            key={index}
            className={`flex items-center space-x-1 p-3 border border-gray-300 rounded-md cursor-pointer text-xs font-semibold text-black ${
              selectedOptions.includes(option) ? "bg-gray-100" : ""
            }`}
          >
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="cursor-pointer"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-row bg-amber-50 p-2 mt-3 rounded-md">
        <HiLightBulb className="text-2xl" fill="yellow" />
        <p className="text-xs m-2">
          We will find you plans that cover your condition
        </p>
      </div>

      <div className="mt-2 text-xs font-medium flex justify-between items-center">
        <p>Get Updates on WhatsApp</p>
        <div class="relative inline-block w-11 h-5">
          
          <div class="relative inline-block w-11 h-5">
            <input
              defaultChecked
              id="switch-component-1"
              type="checkbox"
              class="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
            />
            <label
              for="switch-component-1"
              class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
            ></label>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onNext}
          className="bg-black text-white px-6 py-2 rounded-md w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MedicalHistory;
