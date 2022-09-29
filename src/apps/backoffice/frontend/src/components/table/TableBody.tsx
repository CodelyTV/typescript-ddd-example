import React from 'react';
import TableCell from './TableCell';
import TableRow from './TableRow';

function TableBody({ children }: { children: React.ReactElement<typeof TableRow<typeof TableCell>>[] }) {
  return (
    <tbody>
      {children}
    </tbody>
  );
}

export default TableBody;
