import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <div className="bg-zinc-100 min-h-screen">
      <Navbar />
      <div className='max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
        <h1 className='font-bold text-2xl text-zinc-800 mb-6'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
        {allJobs.length === 0 && (
          <div className="text-center mt-8 text-zinc-500">
            No jobs found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;