import { createContext, useState, useContext, useEffect } from "react";

// Create FormContext
export const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

// Provider Component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    step: 1, // Track current step
    gender: "",
    familyMembers: [
      { name: "Self", age: "" },
      { name: "Wife", age: "" },
      { name: "Son", age: "" },
      { name: "Daughter", age: "" },
      { name: "Father", age: "" },
      { name: "Mother", age: "" },
    ],
    additionalDetails: "",
  });

  // Load data from local storage when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
    }
  }, []); // Runs only once when the component mounts

  // Save form data to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook to Use Form Context
