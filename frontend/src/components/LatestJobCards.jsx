import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-white rounded-md shadow-md border border-zinc-200 p-4 sm:p-5 cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div>
        <h2 className="font-semibold text-zinc-700 text-sm sm:text-base mb-1">{job?.company?.name || 'Company Name'}</h2>
        <p className="text-xs text-zinc-500 mb-2">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg text-zinc-800 mb-2">{job?.title}</h1>
        <p className="text-sm text-zinc-600 line-clamp-2 mb-3">
          {job?.description || 'No description available'}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Badge className="bg-blue-100 text-blue-700 font-semibold text-xs rounded-full px-2 py-1">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-orange-100 text-orange-700 font-semibold text-xs rounded-full px-2 py-1">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 font-semibold text-xs rounded-full px-2 py-1">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;