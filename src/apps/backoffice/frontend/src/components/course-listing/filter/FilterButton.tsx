import React, { MouseEventHandler } from 'react';

function FilterButton({ onFilter }: { onFilter: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      className="m-2 md:w-1/6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      id="filter-button"
      onClick={onFilter}
    >
      👉 Filtrar 👈
    </button>
  );
}

export default FilterButton;
