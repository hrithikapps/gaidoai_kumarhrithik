import { createContext, useState, useContext, useEffect } from "react";

export const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    step: 1, 
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        setFormData(JSON.parse(storedData));
      }
    }
  }, []); 

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

