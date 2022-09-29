import React from 'react';

function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="font-sans text-gray-800 text-center text-5xl mb-10">{title}</h1>
  );
}

export default PageTitle;
