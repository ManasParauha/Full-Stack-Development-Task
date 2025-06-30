'use client';

import { useEffect, useState } from 'react';

type Contact = {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
};

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contact');
        const data = await res.json();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contact form details:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Contact Form Details</h2>
      {contacts.length === 0 ? (
        <p className="text-sm text-gray-500">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Mobile</th>
                <th className="p-2 border">City</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-2 border">{c.fullName}</td>
                  <td className="p-2 border">{c.email}</td>
                  <td className="p-2 border">{c.mobile}</td>
                  <td className="p-2 border">{c.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactList;
