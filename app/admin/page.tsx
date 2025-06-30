'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');

  const [project, setProject] = useState({
    image: '',
    name: '',
    description: ''
  });

  const handleChange = (e:any) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post('/api/project', project);
      alert('✅ Project added successfully!');
      setProject({ image: '', name: '', description: '' });
    } catch (error) {
      alert('❌ Failed to add project');
    }
  };

  if (secret !== 'flipr123') {
    return (
      <div className="p-4 text-red-600 font-semibold">
        ❌ Unauthorized access. Please provide a valid secret key.
      </div>
    );
  }

  return (
    <div>
      
    </div>
  );
}
