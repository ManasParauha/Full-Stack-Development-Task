'use client';

import AddProjectForm from '@/components/admin/AddProjectForm';
import AddClientForm from '@/components/admin/AddClientForm';
import ContactList from '@/components/admin/ContactList';
import SubscriberList from '@/components/admin/SubscriberList';


export default function AdminPage() {
  
  



  return (
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <AddProjectForm/>
      <AddClientForm/>
      <ContactList/>
      <SubscriberList/>
    </div>
  );
}
