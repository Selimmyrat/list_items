function EditModal({
  setEditingItem,
  editName,
  setEditName,
  saveEdit,
  editCategory,
  setEditCategory,
}) {
  function onEnterClick(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      saveEdit();
    }
  }
  return (
    <div
      onClick={() => setEditingItem(null)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <form onKeyDown={onEnterClick} onSubmit={saveEdit}>
          <h2 className="font-semibold mb-4 text-lg">Edit Item</h2>

          <div className="">
            <label htmlFor="name">Name</label>
            <input
              value={editName}
              name="name"
              onChange={(e) => setEditName(e.target.value)}
              className="border p-2 w-full mb-4"
              required
            />
          </div>

          <div className="">
            <label htmlFor="category">Category</label>
            <input
              value={editCategory}
              name="category"
              onChange={(e) => setEditCategory(e.target.value)}
              className="border p-2 w-full mb-4"
              required
            />
          </div>

          <div className="flex flex-row gap-2">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => setEditingItem(null)}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditModal;
