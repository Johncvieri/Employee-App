import { useEffect, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
import type { EmployeeCreateRequest } from "../../types/EmployeeCreateRequest";

const emptyForm: EmployeeCreateRequest = {
  name: "",
  idNumber: 0,
  gender: 1,
  positionId: 1,
  birthDate: "",
};

const EmployeeModal = ({ isOpen, onClose, selected }: any) => {
  const { createEmployee, updateEmployee } = useEmployeeContext();
  const [form, setForm] = useState<EmployeeCreateRequest>(emptyForm);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        idNumber: Number(selected.idNumber),
        gender: selected.gender === "FEMALE" ? 2 : 1,
        positionId: selected.positionId || 1,
        birthDate: selected.birthDate || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [selected, isOpen]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "idNumber" || name === "positionId" || name === "gender"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.idNumber) {
      alert("Name dan NIK wajib diisi!");
      return;
    }

    if (selected) {
      await updateEmployee(selected.id, form);
    } else {
      await createEmployee(form);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">

      {/* MODAL BOX */}
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-2xl shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            {selected ? "Edit Employee" : "Add Employee"}
          </h2>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-5 space-y-4 overflow-y-auto">

          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">NIK</label>
            <input
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="123456"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value={1}>Male</option>
              <option value={2}>Female</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Position ID</label>
            <input
              name="positionId"
              value={form.positionId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>

        {/* FIXED BUTTON SECTION (ALWAYS VISIBLE) */}
        <div className="p-5 border-t flex justify-end gap-2 bg-white">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
};

export default EmployeeModal;