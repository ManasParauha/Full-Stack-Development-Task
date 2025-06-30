'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { fullName, email, mobile, city } = form;

    if (!fullName || !email || !mobile || !city) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await axios.post('/api/contact', form);
      toast.success('Form submitted!');
      setForm({ fullName: '', email: '', mobile: '', city: '' });
    } catch (error) {
      toast.error('Submission failed.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Mobile Number"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="City"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ContactForm;
