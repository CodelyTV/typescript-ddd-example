import React, { ChangeEvent } from 'react';

function Filter({
  onFieldSelected,
  onOperatorSelected,
  onValueChanged
}: {
  onFieldSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
  onOperatorSelected: (event: ChangeEvent<HTMLSelectElement>) => void;
  onValueChanged: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="filter-row">
      <div className="inline-block relative w-64 mr-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="field">
          Campo
        </label>
        <select
          id="field"
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={onFieldSelected}
        >
          <option value="id">Identificador</option>
          <option value="name">Nombre</option>
          <option value="duration">Duración</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
          </svg>
        </div>
      </div>
      <div className="inline-block relative w-64 mr-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="operator">
          Operador
        </label>
        <select
          id="operator"
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={onOperatorSelected}
        >
          <option value="=">es exactamente igual</option>
          <option value="CONTAINS">contiene</option>
          <option value=">">es más grande que</option>
          <option value="<">es más pequeño que</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
          </svg>
        </div>
      </div>
      <div className="inline-block relative w-64 mr-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="value">
          Valor
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="value"
          type="text"
          placeholder="Lo que sea..."
          onChange={onValueChanged}
        />
      </div>
    </div>
  );
}

export default Filter;
