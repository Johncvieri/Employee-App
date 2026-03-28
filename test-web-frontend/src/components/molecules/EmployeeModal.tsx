import { useEffect, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
import { getPositions } from "../../services/PositionService";
import type { Employee, EmployeeRequest } from "../../types/Employee";
import type { Position } from "../../types/Position";

const emptyForm: EmployeeRequest = {
  name: "",
  idNumber: 0,
  gender: "MALE",
  positionId: 0,
  birthDate: "",
};

const EmployeeModal = ({
  isOpen,
  onClose,
  selected,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: Employee | null;
}) => {
  const { createEmployee, updateEmployee, loading } = useEmployeeContext();

  const [form, setForm] = useState<EmployeeRequest>(emptyForm);
  const [positions, setPositions] = useState<Position[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await getPositions();
        setPositions(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (isOpen) fetchPositions();
  }, [isOpen]);

  useEffect(() => {
    if (selected) {
      setForm({
        name: selected.name,
        idNumber: selected.idNumber,
        gender: selected.gender,
        positionId: selected.positionId,
        birthDate: selected.birthDate || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [selected, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "idNumber" || name === "positionId"
          ? Number(value)
          : name === "gender"
          ? (value as "MALE" | "FEMALE")
          : value,
    }));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.name.trim()) {
      setError("Nama wajib diisi");
      return;
    }

    if (!form.idNumber || form.idNumber <= 0) {
      setError("NIK tidak valid");
      return;
    }

    if (!form.positionId || form.positionId === 0) {
      setError("Pilih jabatan");
      return;
    }

    try {
      if (selected) {
        await updateEmployee(selected.id, form);
      } else {
        await createEmployee(form);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] rounded-2xl shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">
            {selected ? "Edit Employee" : "Add Employee"}
          </h2>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-4 overflow-y-auto">

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">NIK</label>
            <input
              type="number"
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
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
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Pilih Jabatan</label>
            <select
              name="positionId"
              value={form.positionId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value={0}>-- Pilih Jabatan --</option>
              {positions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
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

        {/* FOOTER */}
        <div className="p-5 border-t flex justify-end gap-2 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;