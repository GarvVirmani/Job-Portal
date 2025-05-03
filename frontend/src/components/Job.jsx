import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
  };

  return (
    <div className="bg-white rounded-md shadow-md border border-zinc-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-zinc-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full border-zinc-300 text-zinc-600 hover:bg-zinc-100" size="icon">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-md overflow-hidden w-10 h-10 sm:w-12 sm:h-12">
          <Avatar className="w-full h-full">
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name || 'Company Logo'} />
          </Avatar>
        </div>
        <div>
          <h2 className="font-semibold text-zinc-700 text-sm sm:text-base">{job?.company?.name}</h2>
          <p className="text-xs text-zinc-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg text-zinc-800 mb-2">{job?.title}</h1>
        <p className="text-sm text-zinc-600 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-3 flex-wrap">
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

      <div className="flex items-center gap-2 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="rounded-md border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-sm">
          Details
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;