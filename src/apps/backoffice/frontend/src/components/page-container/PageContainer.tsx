import React from 'react';
import PageAlert from './PageAlert';
import PageContent from './PageContent';
import PageTitle from './PageTitle';

function PageContainer({ title, alert, children }: { title: string, alert?: string, children: React.ReactNode }) {
  return (
    <div className="page-container columns-1">
        {alert && <PageAlert message={alert} /> }
        <div className="flex w-full place-content-center">
          <PageTitle title={title} />
        </div>
        <div className="flex w-full place-content-center">
          <PageContent>{children}</PageContent>
        </div>
    </div>
  );
}

export default PageContainer;
