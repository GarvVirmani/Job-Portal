import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const isResume = user?.profile?.resume ? true : false;

  return (
    <div className="bg-zinc-100 min-h-screen">
      <Navbar />
      <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-zinc-200 my-8 p-6 sm:p-8'>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center gap-4'>
            <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20">
              <Avatar className="w-full h-full">
                <AvatarImage src={user?.profile?.avatar || 'default-avatar.png'} alt="profile" />
              </Avatar>
            </div>
            <div>
              <h1 className='font-semibold text-xl text-zinc-800'>{user?.fullname}</h1>
              <p className='text-zinc-600 text-sm'>{user?.profile?.bio || 'No bio available'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="rounded-md border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-sm"><Pen className="h-4 w-4" /></Button>
        </div>
        <div className='mb-5 space-y-3'>
          <div className='flex items-center gap-3'>
            <Mail className="h-4 w-4 text-zinc-500" />
            <span className='text-zinc-700'>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact className="h-4 w-4 text-zinc-500" />
            <span className='text-zinc-700'>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='mb-5'>
          <h2 className='font-semibold text-lg text-zinc-700 mb-2'>Skills</h2>
          <div className='flex items-center gap-2 flex-wrap'>
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="bg-zinc-200 text-zinc-700 rounded-full px-2 py-1 text-xs font-semibold">{item}</Badge>
              ))
            ) : (
              <span className='text-zinc-500 text-sm'>No skills added</span>
            )}
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 mb-5'>
          <Label className="text-md font-semibold text-zinc-700">Resume</Label>
          {isResume ? (
            <a target='_blank' rel="noopener noreferrer" href={user?.profile?.resume} className='text-blue-500 hover:underline cursor-pointer text-sm'>
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className='text-zinc-500 text-sm'>No resume available</span>
          )}
        </div>
        <div>
          <h2 className='font-bold text-lg text-zinc-700 mb-4'>Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;