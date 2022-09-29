import React from 'react';

function FormSubmit({ label }: { label: string }) {
  return (
    <div>
      <button
        type="submit"
        className="md:w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {label}
      </button>
    </div>
  );
}

export default FormSubmit;
