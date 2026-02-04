import React from 'react';
import WorldInfo from '../components/WorldInfo';
import PageHeader from '../components/PageHeader';

const ContentsPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <PageHeader />
      </div>
      <WorldInfo />
    </div>
  );
};

export default ContentsPage;