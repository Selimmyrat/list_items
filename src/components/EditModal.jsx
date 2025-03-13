function EditModal({ setEditingItem, editValue, setEditValue, saveEdit }) {
  return (
    <div
      onClick={() => setEditingItem(null)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="font-semibold mb-4 text-lg">Edit Item</h2>
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex flex-row gap-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => setEditingItem(null)}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            onClick={saveEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditModal;
