'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';
import logo from '@/public/logo.svg'
const Navbar = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post('/api/newsletter', { email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error: any) {
      console.error(error);
      toast.error('Subscription failed.');
    }
  };

  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-8">
          <Image src={logo} alt="Logo" width={100} height={100} />
          <div className="hidden sm:flex gap-4 text-sm font-medium text-gray-600">
            <span className="cursor-pointer hover:text-black">Home</span>
            <span className="cursor-pointer hover:text-black">Projects</span>
            <span className="cursor-pointer hover:text-black">Clients</span>
            <span className="cursor-pointer hover:text-black">Contact</span>
          </div>
        </div>

        {/* Right: Newsletter */}
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
