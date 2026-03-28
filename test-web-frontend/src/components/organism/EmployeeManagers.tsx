import { useEffect, useState } from "react";
import { useEmployeeContext } from "../../context/EmployeeContext";
import EmployeeModal from "../molecules/EmployeeModal";
import DeleteDialog from "../molecules/DeleteDialog";
import type { Employee } from "../../types/Employee";

const EmployeeManager = () => {
  const {
    employees,
    fetchEmployees,
    deleteEmployee,
    loading,
    error,
  } = useEmployeeContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Manajemen Karyawan</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelected(null);
            setIsOpen(true);
          }}
        >
          + Tambah
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-3 rounded">
          {error}
        </div>
      )}

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">NIK</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Jabatan</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                Tidak ada data
              </td>
            </tr>
          )}

          {employees.map((e: Employee) => (
            <tr key={e.id}>
              <td className="p-2 border">{e.name}</td>
              <td className="p-2 border">{e.idNumber}</td>
              <td className="p-2 border">
                {e.gender === "MALE" ? "Laki-laki" : "Perempuan"}
              </td>
              <td className="p-2 border">{e.positionName}</td>

              <td className="p-2 border space-x-2">
                <button
                  className="bg-yellow-500 px-2 py-1 rounded"
                  onClick={() => {
                    setSelected(e);
                    setIsOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-2 py-1 rounded disabled:opacity-50"
                  disabled={loading}
                  onClick={() => setDeleteId(e.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      <EmployeeModal
        isOpen={isOpen}
        selected={selected}
        onClose={() => {
          setIsOpen(false);
          setSelected(null);
        }}
      />

      {/* DELETE */}
      <DeleteDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          if (deleteId) {
            await deleteEmployee(deleteId);
          }
          setDeleteId(null);
        }}
      />
    </div>
  );
};

export default EmployeeManager;