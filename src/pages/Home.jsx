import { useState, useEffect } from "react";

import ItemsRow from "../components/ItemsRow";
import Pagitanions from "../components/Paginations";
import EditModal from "../components/EditModal";
import AddModal from "../components/AddModal";

function Home() {
  const [items, setItems] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [isAddingBtn, setIsAddingBtn] = useState(false);
  const [isAddingModal, setIsAddingModal] = useState(false);

  const apiUrl = "http://localhost:5000/items";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  function changeHandleName(e) {
    const duplicateExists = items.some((item) => item.name === e.target.value);

    if (duplicateExists) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }

    setNameValue(e.target.value);
  }

  function changeHandleCategory(e) {
    const duplicateExists = items.some(
      (item) => item.category === e.target.value
    );

    if (duplicateExists) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }

    setCategoryValue(e.target.value);
  }

  async function addHandle() {
    if (nameValue.trim() === "" || categoryValue.trim() === "" || isDuplicate)
      return;

    setIsAddingBtn(true);
    const nowDate = new Date().toISOString().split("T")[0];
    const newItem = {
      name: nameValue,
      category: categoryValue,
      date: nowDate,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();
      setItems([...items, data]);
      setNameValue("");
      setCategoryValue("");
    } catch (error) {
      console.error("Error adding item", error);
    } finally {
      setIsAddingBtn(false);
      setIsAddingModal(null);
    }
  }

  async function deleteItem(id) {
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  function startEditing(item) {
    setEditingItem(item);
    setEditName(item.name);
    setEditCategory(item.category);
  }

  async function saveEdit() {
    const updatedItem = {
      ...editingItem,
      name: editName,
      category: editCategory,
    };

    try {
      await fetch(`${apiUrl}/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      setItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? updatedItem : item))
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Error editing item:", error);
    }
  }

  return (
    <div className="w-full mx-auto">
      <div className="rounded-2xl m-2 p-4 bg-slate-100 border-none">
        <div className="flex flex-row justify-between my-2 mb-10">
          <h1 className=" font-semibold text-lg">Add Items</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <button
                className="rounded px-5 py-1 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsAddingModal(true)}
              >
                Add +
              </button>
            </div>
          </div>
        </div>

        <table className="w-full overflow-hidden">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-2 text-left">№</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <ItemsRow
                key={item.id}
                item={item}
                index={index}
                deleteItem={deleteItem}
                startEditing={startEditing}
              />
            ))}
          </tbody>
        </table>
        <Pagitanions />
      </div>
      {editingItem !== null && (
        <EditModal
          setEditingItem={setEditingItem}
          editName={editName}
          setEditName={setEditName}
          saveEdit={saveEdit}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
        />
      )}
      {isAddingModal && (
        <AddModal
          setIsAddingModal={setIsAddingModal}
          isDuplicate={isDuplicate}
          inputValue={nameValue}
          categoryValue={categoryValue}
          changeHandleName={changeHandleName}
          changeHandleCategory={changeHandleCategory}
          isAddingBtn={isAddingBtn}
          addHandle={addHandle}
        />
      )}
    </div>
  );
}

export default Home;
