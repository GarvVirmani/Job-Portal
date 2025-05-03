import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          toast.error(res.data.message || 'Failed to fetch job details');
          navigate('/jobs'); // Redirect on error
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching job details');
        navigate('/jobs'); // Redirect on error
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id, navigate]);

  if (!singleJob) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-zinc-500">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white rounded-md shadow-md border border-zinc-200">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="font-bold text-xl text-zinc-800 mb-2">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-blue-100 text-blue-700 font-semibold text-xs rounded-full px-2 py-1">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 font-semibold text-xs rounded-full px-2 py-1">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 font-semibold text-xs rounded-full px-2 py-1">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied || !user}
            className={`rounded-md text-sm ${isApplied || !user ? 'bg-zinc-400 cursor-not-allowed text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
          >
            {isApplied ? 'Already Applied' : user ? 'Apply Now' : 'Login to Apply'}
          </Button>
        </div>
        <div className="border-b border-zinc-300 pb-4 mb-4">
          <h2 className="font-semibold text-lg text-zinc-700">Job Description</h2>
        </div>
        <div className="space-y-3 text-zinc-600">
          <div>
            <span className="font-semibold">Role:</span> <span className="pl-2">{singleJob?.title}</span>
          </div>
          <div>
            <span className="font-semibold">Location:</span> <span className="pl-2">{singleJob?.location}</span>
          </div>
          <div>
            <span className="font-semibold">Description:</span> <span className="pl-2">{singleJob?.description}</span>
          </div>
          <div>
            <span className="font-semibold">Experience:</span> <span className="pl-2">{singleJob?.experience} yrs</span>
          </div>
          <div>
            <span className="font-semibold">Salary:</span> <span className="pl-2">{singleJob?.salary} LPA</span>
          </div>
          <div>
            <span className="font-semibold">Total Applicants:</span> <span className="pl-2">{singleJob?.applications?.length}</span>
          </div>
          <div>
            <span className="font-semibold">Posted Date:</span> <span className="pl-2">{singleJob?.createdAt?.split('T')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;