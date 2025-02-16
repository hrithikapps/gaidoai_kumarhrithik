import { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import React from "react";
import BackButton from "./Buttons/BackButton";
import { RxAvatar } from "react-icons/rx";

const SelectAge = ({ onNext, onBack }) => {
  const { formData, setFormData } = useFormContext();
  const [errors, setErrors] = useState(
    Array(formData.familyMembers.length).fill(false)
  );

  const handleAgeChange = (index, value) => {
    const updatedMembers = [...formData.familyMembers];
    updatedMembers[index].age = value;
    setFormData((prev) => ({ ...prev, familyMembers: updatedMembers }));

    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = !value;
      return newErrors;
    });
  };

  const handleContinue = () => {
    const newErrors = formData.familyMembers.map((member) => !member.age);
    setErrors(newErrors);

    // Proceed only if all ages are entered
    if (!newErrors.includes(true)) {
      onNext();
    }
  };

  return (
    <div className="min-w-[50vw] bg-white p-6 shadow-lg rounded-sm">
      <div>
        <div onClick={onBack}>
          <BackButton />
        </div>

        <h3 className="text-2xl font-bold mb-4 text-center">
          Select Age of Covered Member(s)
        </h3>
      </div>

      {formData.familyMembers.map((member, index) => (
        <div key={index} className="flex items-center w-full space-x-4 mb-4">
          <div className="text-3xl text-gray-700">
            <RxAvatar />
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-left text-gray-600">
              {member.name}
            </label>
            <input
              type="number"
              placeholder="Enter Age"
              value={member.age}
              onChange={(e) => handleAgeChange(index, e.target.value)}
              className={`border p-2 rounded-md w-full ${
                errors[index] ? "border-red-500" : ""
              }`}
            />
            {errors[index] && (
              <p className="text-red-500 text-xs mt-1">Please enter age</p>
            )}
          </div>
        </div>
      ))}

      <div className="mt-6 text-center">
        <button
          onClick={handleContinue}
          className="bg-black text-white px-6 py-2 rounded-md w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectAge;
