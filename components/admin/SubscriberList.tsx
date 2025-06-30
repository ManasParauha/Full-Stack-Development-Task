'use client';

import { useEffect, useState } from 'react';

type Subscriber = {
  _id: string;
  email: string;
};

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch('/api/newsletter');
        const data = await res.json();
        setSubscribers(data);
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers</h2>
      {subscribers.length === 0 ? (
        <p className="text-sm text-gray-500">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Email Address</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub._id} className="border-t">
                  <td className="p-2 border">{sub.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscriberList;
