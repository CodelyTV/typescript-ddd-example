import React from 'react';
import TableCell from './TableCell';
import TableHead from './TableHead';

function TableRow<T extends typeof TableHead | typeof TableCell>({
  children
}: {
  children: React.ReactElement<T> | React.ReactElement<T>[];
}) {
  return <tr>{children}</tr>;
}

export default TableRow;
