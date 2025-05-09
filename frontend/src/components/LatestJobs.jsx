import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className='max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold text-zinc-800 mb-6'>
        <span className='text-orange-600'>Latest & Top</span> Job Openings
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {allJobs.length <= 0 ? (
          <div className="text-center text-zinc-500 py-8">No Job Available</div>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;