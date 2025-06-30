'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';

type Client = {
  _id: string;
  name: string;
  designation: string;
  description: string;
  image: string;
};

const ClientSection = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get('/api/client');
        setClients(res.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Happy Clients</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client._id} className="overflow-hidden p-4 flex flex-col items-center text-center">
            <img
              src={client.image}
              alt={client.name}
              className="h-32 w-32 object-cover rounded-full mb-4"
            />
            <CardContent className="p-0 space-y-1">
              <p className="text-sm text-gray-700">{client.description}</p>
              <h3 className="text-lg font-semibold">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.designation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientSection;
