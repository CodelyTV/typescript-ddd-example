import React from 'react';

function TableHead({ name }: { name: string }) {
  return (
    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
      {name}
    </th>
  );
}

export default TableHead;
