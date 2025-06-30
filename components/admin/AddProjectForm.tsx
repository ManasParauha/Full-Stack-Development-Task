'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useEdgeStore } from '@/lib/edgestore';
import toast from 'react-hot-toast';
import axios from 'axios';
import ImageCropper from '@/components/common/ImageCropper';

const AddProjectForm = () => {
  const { edgestore } = useEdgeStore();

  const [project, setProject] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async () => {
    const { name, description, image } = project;

    if (!name || !description || !image) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      await axios.post('/api/project', project);
      toast.success('Project added!');
      setProject({ name: '', description: '', image: '' });
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (err: any) {
      toast.error('Failed to add project.');
      console.error(err);
    }
  };

  return (
    <div className='border border-border p-6 rounded-lg max-w-xl w-full'>
      <h2 className='text-xl font-bold mb-4'>Add Project</h2>

      <div className='mb-4'>
        <p className='text-sm font-semibold'>Project Name</p>
        <Input
          type='text'
          placeholder='Project name'
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
      </div>

      <div className='mb-4'>
        <p className='text-sm font-semibold'>Description</p>
        <Input
          type='text'
          placeholder='Project description'
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
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

      {project.image && (
        <div className='mb-4'>
          <p className='text-sm font-semibold mb-1'>Preview</p>
          <img src={project.image} alt='Preview' className='w-48 h-auto rounded-md border' />
        </div>
      )}

      <Button type='button' onClick={handleSubmit}>Submit Project</Button>

      {/* ImageCropper Modal */}
      {showCropper && selectedFile && (
        <ImageCropper
          file={selectedFile}
          onCropComplete={async (croppedBlob) => {
            try {
              const res = await edgestore.publicFiles.upload({
                file: new File([croppedBlob], 'cropped.jpg'),
                onProgressChange: (p) => setUploadProgress(p),
              });
              setProject((prev) => ({ ...prev, image: res.url }));
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

export default AddProjectForm;
