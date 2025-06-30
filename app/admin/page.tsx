'use client';
import { useSearchParams } from 'next/navigation';
import AddProjectForm from '@/components/admin/AddProjectForm';
import AddClientForm from '@/components/admin/AddClientForm';


export default function AdminPage() {
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');

  if (secret !== 'flipr123') {
    return (
      <div className="p-4 text-red-600 font-semibold">
        ❌ Unauthorized access. Please provide a valid secret key.
      </div>
    );
  }

  return (
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <AddProjectForm/>
      <AddClientForm/>
    </div>
  );
}
