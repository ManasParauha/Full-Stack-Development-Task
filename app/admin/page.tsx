// app/admin/page.jsx
'use client';
import { useSearchParams } from 'next/navigation';

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
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Project Form */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Project</h2>
        {/* form fields go here */}
      </section>

      {/* Client Form */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Client</h2>
        {/* form fields go here */}
      </section>

      {/* Contact View & Newsletter View will come here */}
    </div>
  );
}
