function AddModal({
  setIsAddingModal,
  isDuplicate,
  nameValue,
  changeHandleName,
  changeHandleCategory,
  isAddingBtn,
  addHandle,
  categoryValue,
}) {
  return (
    <div
      onMouseDown={() => setIsAddingModal(null)}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="font-semibold mb-4 text-lg">Add Product</h2>
        <h1>Product Name</h1>
        {isDuplicate && (
          <p className="text-red-600 font-semibold mb-2">
            Name or category dublicated
          </p>
        )}
        <input
          className="border p-2 w-full mb-4"
          value={nameValue}
          onChange={changeHandleName}
          type="text"
          placeholder="Add Item"
          required
        />

        <h1>Choose Category</h1>
        
        <input
          className="border p-2 w-full mb-4"
          value={categoryValue}
          onChange={changeHandleCategory}
          type="text"
          placeholder="Add Category"
          required
        />

        <div className="flex flex-row gap-2">
          <button
            onClick={() => setIsAddingModal(null)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            type="submit"
            disabled={isDuplicate || isAddingBtn}
            onClick={addHandle}
          >
            {isAddingBtn ? "Adding" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddModal;
