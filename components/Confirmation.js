// import { useFormContext } from "../context/FormContext";

const Confirmation = ({ onBack }) => {
  const { formData } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Confirmation</h2>
      {formData.familyMembers.length === 0 ? (
        <p>No family members added.</p>
      ) : (
        <ul className="mb-4">
          {formData.familyMembers.map((member, index) => (
            <li key={index} className="border p-2 mb-2">
              {member.relation} - {member.age} years old
            </li>
          ))}
        </ul>
      )}
      <button onClick={onBack} className="bg-gray-500 text-white p-2 mr-2">
        Back
      </button>
    </div>
  );
};

export default Confirmation;
