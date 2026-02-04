import React from 'react';
import ClassSystem from '../components/ClassSystem';
import PageHeader from '../components/PageHeader';
import { RoleType } from '../types';

interface ClassesPageProps {
  role: RoleType;
  setRole: (role: RoleType) => void;
}

const ClassesPage: React.FC<ClassesPageProps> = ({ role, setRole }) => {
  return (
    <div className="pt-24 min-h-screen">
       <div className="max-w-7xl mx-auto flex flex-col items-center">
        <PageHeader />
      </div>
      <ClassSystem selectedRole={role} onRoleChange={setRole} />
    </div>
  );
};

export default ClassesPage;