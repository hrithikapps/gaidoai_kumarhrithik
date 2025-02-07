import { useState } from "react";
import { useFormContext } from "../context/FormContext";
import { IoMdPerson } from "react-icons/io"; // Example icon

const FamilyForm = ({ onNext }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedGender, setSelectedGender] = useState(formData.gender);
  const [selectedMembers, setSelectedMembers] = useState([]); // Store selected members for border change

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setFormData((prev) => ({ ...prev, gender }));
  };

  // Toggle selection by adding/removing from selectedMembers array (only affects UI)
  const handleToggleMember = (memberName) => {
    setSelectedMembers(
      (prevSelected) =>
        prevSelected.includes(memberName)
          ? prevSelected.filter((name) => name !== memberName) // Remove selection
          : [...prevSelected, memberName] // Add selection
    );
  };

  // Handle adding new members from dropdown (Allows Duplicates)
  const handleAddMember = (e) => {
    const newMember = e.target.value;
    if (newMember) {
      setFormData((prev) => ({
        ...prev,
        familyMembers: [...prev.familyMembers, { name: newMember, age: "" }],
      }));
      e.target.value = ""; // Reset dropdown after selection
    }
  };

  return (
    <div className="max-w-[40vw] bg-white p-6 shadow-lg rounded-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Find the best plan for your family
      </h2>

      {/* Gender Selection */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-md ${
            selectedGender === "Male" ? "bg-black text-white" : "bg-gray-300"
          }`}
          onClick={() => handleGenderSelect("Male")}
        >
          Male
        </button>
        <button
          className={`px-6 py-2 rounded-md ${
            selectedGender === "Female" ? "bg-black text-white" : "bg-gray-300"
          }`}
          onClick={() => handleGenderSelect("Female")}
        >
          Female
        </button>
      </div>

      {/* Family Members Selection (Now Fully Dynamic) */}
      <h3 className="text-lg font-semibold mb-4 text-left">
        Select family members you want to insure
      </h3>
      <div className="flex flex-wrap mb-4">
        {formData.familyMembers.map((member, index) => {
          const isSelected = selectedMembers.includes(member.name); // Check if selected
          return (
            <div
              key={index}
              onClick={() => handleToggleMember(member.name)}
              className={`flex flex-row w-[150px] p-3 m-3 cursor-pointer align-middle items-center space-x-2 rounded-md border transition duration-200 ${
                isSelected ? "border-black" : "border-gray-300"
              }`}
            >
              {/* Icon remains as per your original request */}
              <span className="size-[38px] bg-gray-100 rounded-full overflow-hidden flex justify-center items-center">
                <IoMdPerson className="text-2xl text-gray-500" />
              </span>
              <p className="text-xs font-semibold">{member.name}</p>
            </div>
          );
        })}
      </div>

      {/* Dropdown to Add More Members (Allows Duplicates) */}
      <div className="text-center text-xs mb-4 font-semibold border-collapse">
        <select onChange={handleAddMember} className="border p-2 rounded-md">
          <option value="">Add More Members</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="Grandfather">Grandfather</option>
          <option value="Grandmother">Grandmother</option>
        </select>
      </div>

      {/* Continue Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onNext}
          className="bg-black text-white px-6 py-2 rounded-md w-full"
        >
          Continue
        </button>
      </div>
      <div>
        <span className="text-xs text-slate-400">
          By clicking on continue you agree to our
        </span>
        <span>
          <a href="#" className="text-xs font-semibold">
            Privacy policy
          </a>
          <a href="#" className="text-xs font-semibold">
            {" "}
            terms of use
          </a>
          <span className="text-xs text-slate-400"> & </span>
          <a href="#" className="text-xs font-semibold">
            {" "}
            Disclaimer
          </a>
        </span>
      </div>
    </div>
  );
};

export default FamilyForm;
