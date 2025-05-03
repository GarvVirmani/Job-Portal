import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate('/browse');
    }
  };

  return (
    <div className='text-center py-20 bg-zinc-100'>
      <div className='flex flex-col gap-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
        <span className='mx-auto px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold'>
          Your Journey to Your Dream Job Starts Here
        </span>
        <h1 className='text-4xl lg:text-5xl font-extrabold text-zinc-800 leading-tight'>
          Discover Your Next Career <span className='text-orange-600'>Opportunity</span>.
        </h1>
        <p className='text-lg text-zinc-600'>
          Explore a wide range of job openings and find the perfect match for your skills and aspirations.
        </p>
        <div className='flex w-full md:w-3/4 shadow-md border border-zinc-200 rounded-full items-center gap-3 mx-auto bg-white'>
          <input
            type='text'
            placeholder='Search by job title, keywords, or company'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full px-4 py-3 rounded-full text-zinc-700'
          />
          <Button onClick={searchJobHandler} className='rounded-r-full bg-orange-600 hover:bg-orange-700 text-white'>
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;