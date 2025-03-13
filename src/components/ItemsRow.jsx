import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

function ItemsRow({ item, index, deleteItem, startEditing }) {
  return (
    <tr key={item.id} className="border-b">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{item.name}</td>
      <td className="p-2">{item.date}</td>
      <td className="p-2 text-center">
        <button
          className="p-1 rounded mr-1 bg-red-500 hover:bg-red-600"
          onClick={() => deleteItem(item.id)}
        >
          <Trash2 className="text-white" />
        </button>
        <button
          onClick={() => startEditing(item)}
          className="p-1 rounded bg-yellow-500 hover:bg-yellow-600"
        >
          <Pencil className="text-white" />
        </button>
      </td>
    </tr>
  );
}

export default ItemsRow;
