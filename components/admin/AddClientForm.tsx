'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useEdgeStore } from '@/lib/edgestore';
import toast from 'react-hot-toast';
import axios from 'axios';
import ImageCropper from '@/components/common/ImageCropper';

const AddClientForm = () => {
  const { edgestore } = useEdgeStore();

  const [client, setClient] = useState({
    name: '',
    designation: '',
    description: '',
    image: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      setSelectedFile(null);
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
          <Input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                setShowCropper(true);
              }
            }}
          />
        </div>
      </div>

      {client.image && (
        <div className='mb-4'>
          <p className='text-sm font-semibold mb-1'>Preview</p>
          <img src={client.image} alt='Preview' className='w-48 h-auto rounded-md border' />
        </div>
      )}

      <Button type='button' onClick={handleSubmit}>Submit Client</Button>

      {/* Image Cropper */}
      {showCropper && selectedFile && (
        <ImageCropper
          file={selectedFile}
          onCropComplete={async (croppedBlob) => {
            try {
              const res = await edgestore.publicFiles.upload({
                file: new File([croppedBlob], 'cropped.jpg'),
                onProgressChange: (p) => setUploadProgress(p),
              });
              setClient((prev) => ({ ...prev, image: res.url }));
              toast.success('Image cropped and uploaded!');
            } catch (err) {
              console.error(err);
              toast.error('Image upload failed');
            } finally {
              setShowCropper(false);
              setSelectedFile(null);
            }
          }}
          onCancel={() => {
            setShowCropper(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
};

export default AddClientForm;
