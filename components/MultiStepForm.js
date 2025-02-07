import FamilyForm from "./FamilyForm";
import Confirmation from "./Confirmation";
import SelectAge from "./SelectAge";
import SelectCity from "./SelectCity";
import MedicalHistory from "./MedicalHistory";
import { useFormContext } from "../context/FormContext";

const MultiStepForm = () => {
  const { formData, setFormData } = useFormContext();

  const handleNext = () => {
    setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
  };

  const handleBack = () => {
    setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  // Step Mapping to Components
  const stepComponents = {
    1: <FamilyForm onNext={handleNext} />,
    2: <SelectAge onNext={handleNext} onBack={handleBack} />,
    3: <SelectCity onNext={handleNext} onBack={handleBack} />,
    4: <MedicalHistory onNext={handleNext} onBack={handleBack} />,
    5: <Confirmation onBack={handleBack} />,
  };

  return <div>{stepComponents[formData.step]}</div>;
};

export default MultiStepForm;
