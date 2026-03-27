const DeleteDialog = ({ isOpen, onClose, onConfirm }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white p-6 w-80 space-y-3">

        <h2 className="font-bold">Konfirmasi</h2>

        <p>Yakin hapus data ini?</p>

        <div className="flex justify-end gap-2">

          <button onClick={onClose}>
            Batal
          </button>

          <button
            className="bg-red-600 text-white px-3"
            onClick={onConfirm}
          >
            Hapus
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteDialog;