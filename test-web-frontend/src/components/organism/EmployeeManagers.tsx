import { useEffect, useState } from 'react';
import { useEmployeeContext } from '../../context/EmployeeContext';
import EmployeeModal from '../molecules/EmployeeModal';
import DeleteDialog from './DeleteDialog';

const EmployeeManager = () => {
  const { employees, fetchEmployees, deleteEmployee } = useEmployeeContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
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
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={() => {
            setSelected(null);
            setIsOpen(true);
          }}
        >
          + Tambah Karyawan
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIK</th>
            <th className="border p-2">Jenis Kelamin</th>
            <th className="border p-2">Jabatan</th>
            <th className="border p-2 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Tidak ada data
              </td>
            </tr>
          ) : (
            employees.map((e: any) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="border p-2">{e.name}</td>
                <td className="border p-2">{e.idNumber}</td>
                <td className="border p-2">
                  {e.gender === 1 ? 'Laki-laki' : 'Perempuan'}
                </td>
                <td className="border p-2">{e.positionName}</td>

                <td className="border p-2 text-center space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600"
                    onClick={() => {
                      setSelected(e);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded shadow hover:bg-red-700"
                    onClick={() => setDeleteId(e.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL */}
      <EmployeeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selected={selected}
      />

      {/* DELETE */}
      <DeleteDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) {
            deleteEmployee(deleteId);
          }
          setDeleteId(null);
        }}
      />

    </div>
  );
};

export default EmployeeManager;