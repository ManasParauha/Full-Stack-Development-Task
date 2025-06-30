'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useEdgeStore } from '@/lib/edgestore';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddClientForm = () => {
  const { edgestore } = useEdgeStore();

  const [client, setClient] = useState({
    name: '',
    designation: '',
    description: '',
    image: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    if (!imageFile) {
      toast.error('Please select an image to upload.');
      return;
    }

    try {
      const res = await edgestore.publicFiles.upload({
        file: imageFile,
        onProgressChange: (progress) => setUploadProgress(progress),
      });

      setClient((prev) => ({ ...prev, image: res.url }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Image upload failed.');
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const { name, designation, description, image } = client;

    if (!name || !designation || !description || !image) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      await axios.post('/api/client', client);
      toast.success('Client added!');
      setClient({ name: '', designation: '', description: '', image: '' });
      setImageFile(null);
      setUploadProgress(0);
    } catch (err: any) {
      toast.error('Failed to add client.');
      console.error(err);
    }
  };

  return (
    <div className='border border-border p-6 rounded-lg max-w-xl w-full mt-10'>
      <h2 className='text-xl font-bold mb-4'>Add Client</h2>

      <div className='mb-4'>
        <p className='text-sm font-semibold'>Client Name</p>
        <Input
          type='text'
          placeholder='Name'
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
        />
      </div>

      <div className='mb-4'>
        <p className='text-sm font-semibold'>Designation</p>
        <Input
          type='text'
          placeholder='Designation'
          value={client.designation}
          onChange={(e) => setClient({ ...client, designation: e.target.value })}
        />
      </div>

      <div className='mb-4'>
        <p className='text-sm font-semibold'>Description</p>
        <Input
          type='text'
          placeholder='Description'
          value={client.description}
          onChange={(e) => setClient({ ...client, description: e.target.value })}
        />
      </div>

      <div className='mb-4'>
        <p className='text-sm font-semibold'>Image Upload</p>
        <Progress value={uploadProgress} className='my-2' />
        <div className='flex items-center gap-2'>
          <Input type='file' accept='image/*' onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          <Button type='button' onClick={handleUpload}>Confirm</Button>
        </div>
      </div>

      {client.image && (
        <div className='mb-4'>
          <p className='text-sm font-semibold mb-1'>Preview</p>
          <img src={client.image} alt='Preview' className='w-48 h-auto rounded-md border' />
        </div>
      )}

      <Button type='button' onClick={handleSubmit}>Submit Client</Button>
    </div>
  );
};

export default AddClientForm;
