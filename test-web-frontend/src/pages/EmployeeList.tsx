import { useEffect, useState } from "react";
import { useEmployeeContext } from "../context/EmployeeContext";
import EmployeeModal from "../components/molecules/EmployeeModal";

const EmployeeList = () => {
  const { employees, fetchEmployees, deleteEmployee } = useEmployeeContext();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const openEdit = (emp: any) => {
    setSelected(emp);
    setOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>

        <button
          onClick={openAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Employee
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">NIK</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{emp.name}</td>
                <td className="p-4">{emp.idNumber}</td>
                <td className="p-4">{emp.gender}</td>
                <td className="p-4">{emp.positionName}</td>

                <td className="p-4 flex justify-center gap-2">
                  
                  <button
                    onClick={() => openEdit(emp)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EmployeeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        selected={selected}
      />
    </div>
  );
};

export default EmployeeList;