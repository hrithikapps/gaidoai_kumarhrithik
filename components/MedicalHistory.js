import React from "react";
import BackButton from "./Buttons/BackButton";
import { useFormContext } from "@/context/FormContext";

const MedicalHistory = ({ onBack, onNext }) => {
  const { formData, setFormData } = useFormContext();

  return (
    <div className="min-w-[50vw] bg-white p-6 shadow-lg rounded-sm  ">
      <div>
        <div onClick={onBack}>
          <BackButton />
        </div>

        <h3 className="text-2xl font-bold mb-4 text-center">Medical History</h3>
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
