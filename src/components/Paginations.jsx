function Pagitanions() {
  return (
    <div className="flex flex-row justify-between items-center mt-5 p-1">
      <div>Showing 1 to 10 of 20 results</div>
      <div className="flex flex-row">
        <button className="px-2 py-1 border m-1 rounded bg-white hover:bg-slate-50">
          Prev
        </button>
        <button className="px-2 py-1 border m-1 rounded bg-white hover:bg-slate-50">
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagitanions;
