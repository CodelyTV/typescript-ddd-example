import React from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';

function TableHeader({ children }: { children: React.ReactElement<typeof TableRow<typeof TableHead>> }) {
  return (
    <thead>
      {children}
    </thead>
  );
}

export default TableHeader;
