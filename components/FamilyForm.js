import { useState } from "react";
import { useFormContext } from "../context/FormContext";
import { IoMdPerson } from "react-icons/io"; 

const FamilyForm = ({ onNext }) => {
  const { formData, setFormData } = useFormContext();
  const [selectedGender, setSelectedGender] = useState(formData.gender);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [genderError, setGenderError] = useState(false);
  const [memberError, setMemberError] = useState(false);

  const staticFamilyMembers = [
    "Self",
    "Wife",
    "Son",
    "Daughter",
    "Father",
    "Mother",
  ];

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setFormData((prev) => ({ ...prev, gender }));
    setGenderError(false); 
  };

  const handleToggleMember = (memberName) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberName)
        ? prevSelected.filter((name) => name !== memberName)
        : [...prevSelected, memberName]
    );

    if (staticFamilyMembers.includes(memberName)) {
      setMemberError(false);
    }
  };

  const handleContinue = () => {
    if (!selectedGender) setGenderError(true);
    if (
      !selectedMembers.some((member) => staticFamilyMembers.includes(member))
    ) {
      setMemberError(true);
    } else {
      onNext();
    }
  };

  return (
    <div className="max-w-[40vw] bg-white p-6 shadow-lg rounded-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Find the best plan for your family
      </h2>

      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="flex gap-4">
          <button
            className={`px-6 py-2 rounded-md ${
              selectedGender === "Male" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => handleGenderSelect("Male")}
          >
            Male
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              selectedGender === "Female"
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleGenderSelect("Female")}
          >
            Female
          </button>
        </div>
        {genderError && (
          <p className="text-red-500 text-xs">Please select gender</p>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-4 text-left">
        Select family members you want to insure
      </h3>
      <div className="flex flex-wrap mb-2">
        {formData.familyMembers.map((member, index) => {
          const isStaticMember = staticFamilyMembers.includes(member.name);
          const isSelected = selectedMembers.includes(member.name);

          return (
            <div
              key={index}
              onClick={() => handleToggleMember(member.name)}
              className={`flex flex-row w-[150px] p-3 m-3 cursor-pointer align-middle items-center space-x-2 rounded-md border transition duration-200 ${
                isSelected ? "border-black" : "border-gray-300"
              }`}
            >
              <span className="size-[38px] bg-gray-100 rounded-full overflow-hidden flex justify-center items-center">
                <IoMdPerson className="text-2xl text-gray-500" />
              </span>
              <p className="text-xs font-semibold">{member.name}</p>
            </div>
          );
        })}
      </div>
      {memberError && (
        <p className="text-red-500 text-xs text-center">
          Please add a family member
        </p>
      )}

      <div className="text-center text-xs mb-4 font-semibold border-collapse">
        <select
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              familyMembers: [
                ...prev.familyMembers,
                { name: e.target.value, age: "" },
              ],
            }))
          }
          className="border p-2 rounded-md"
        >
          <option value="">Add More Members</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="Grandfather">Grandfather</option>
          <option value="Grandmother">Grandmother</option>
        </select>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleContinue}
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
