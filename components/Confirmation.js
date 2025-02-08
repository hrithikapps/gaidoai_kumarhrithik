import React from "react";
import { useFormContext } from "@/context/FormContext";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const ConfirmationPage = ({ onBack, onConfirm }) => {
  const { formData } = useFormContext();

  return (
    <div className="min-w-[50vw] bg-white p-6 shadow-lg rounded-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Confirm Your Details
      </h2>

      <div className="flex justify-between items-center border-b pb-4">
        <p className="text-md">
          <strong>Gender:</strong> {formData.gender || "Not selected"}
        </p>
        <p className="text-md">
          <strong>City:</strong> {formData.city || "Not selected"}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Family Members</h3>
        <div className="flex flex-wrap gap-4">
          {formData.familyMembers.length > 0 ? (
            formData.familyMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gray-100 rounded-md w-[200px] space-x-2"
              >
                <IoMdPerson className="text-2xl text-gray-600" />
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-gray-500">
                    Age: {member.age || "N/A"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-red-500">No family members selected</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Medical History</h3>
        <div className="flex flex-wrap gap-2">
          {formData.medicalHistory && formData.medicalHistory.length > 0 ? (
            formData.medicalHistory.map((condition, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-sm rounded-md"
              >
                {condition}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No medical conditions selected
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-md"
        >
          <IoArrowBack className="mr-2" /> Edit Details
        </button>

        <button
          onClick={onConfirm}
          className="flex items-center bg-black text-white px-6 py-2 rounded-md"
        >
          Confirm & Proceed <FaCheckCircle className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
