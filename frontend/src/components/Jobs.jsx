import React, { useEffect, useState, useMemo } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  const filteredJobs = useMemo(() => {
    if (searchedQuery) {
      const lowerCaseQuery = searchedQuery.toLowerCase();
      return allJobs.filter((job) => (
        job.title.toLowerCase().includes(lowerCaseQuery) ||
        job.description.toLowerCase().includes(lowerCaseQuery) ||
        job.location.toLowerCase().includes(lowerCaseQuery) ||
        job.company?.name?.toLowerCase().includes(lowerCaseQuery) // Added company name to search
      ));
    }
    return allJobs;
  }, [allJobs, searchedQuery]);

  useEffect(() => {
    setFilterJobs(filteredJobs);
  }, [filteredJobs]);

  return (
    <div className="bg-zinc-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex gap-5">
        <div className="w-full sm:w-1/4">
          <FilterCard />
        </div>
        <div className="flex-1">
          {filterJobs.length === 0 ? (
            <div className="text-center py-10 text-zinc-500">
              No jobs found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterJobs.map((job) => (
                <motion.div
                  key={job?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;