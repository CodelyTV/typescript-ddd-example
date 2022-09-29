import React from 'react';

function ListingTitle({ title }: { title: string }) {
  return <h3 className="font-sans text-gray-800 text-center text-3xl mb-10">{title}</h3>;
}

export default ListingTitle;
