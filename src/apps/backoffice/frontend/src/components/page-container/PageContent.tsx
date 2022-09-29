import React from 'react';

function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full'>{children}</div>
  );
}

export default PageContent;
