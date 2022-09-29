import React from 'react';

function FormInput({
  id,
  label,
  name,
  value,
  placeholder,
  disabled,
  error,
  onChange
}: {
  id: string;
  label: string;
  name: string;
  value?: string | number | readonly string[];
  placeholder: string;
  disabled?: boolean
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={id}>
        {label}
      </label>

      <input
        className={`${error ? 'border border-red-500' : ''} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
        onChange={onChange}
        id={id}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />

      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
}

export default FormInput;
