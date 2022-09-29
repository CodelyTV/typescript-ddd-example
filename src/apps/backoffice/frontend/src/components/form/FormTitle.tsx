import React from 'react';

function FormTitle({ title }: { title: string }) {
  return <h2 className="block uppercase tracking-wide text-gray-700 text-3xl font-bold mb-2">{title}</h2>;
}

export default FormTitle;
