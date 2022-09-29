import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

function Table({
  className,
  children
}: {
  className: string;
  children: React.ReactElement<typeof TableHeader | typeof TableBody>[];
}) {
  return <table className={`table-auto ${className}`}>{children}</table>;
}

export default Table;
