import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const renderNavLinks = () => {
    if (user?.role === 'recruiter') {
      return (
        <>
          <li><Link to="/admin/companies" className="hover:text-orange-500">Companies</Link></li>
          <li><Link to="/admin/jobs" className="hover:text-orange-500">Jobs</Link></li>
        </>
      );
    } else {
      return (
        <>
          <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
          <li><Link to="/jobs" className="hover:text-orange-500">Jobs</Link></li>
          <li><Link to="/browse" className="hover:text-orange-500">Browse</Link></li>
        </>
      );
    }
  };

  return (
    <div className='bg-zinc-50 text-zinc-700 shadow-md'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        <div>
          <h1 className='text-2xl font-semibold'>Job<span className='text-orange-600'>Portal</span></h1>
        </div>
        <div className='hidden lg:flex items-center gap-8'>
          <ul className='flex font-medium items-center gap-6'>
            {renderNavLinks()}
          </ul>
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login"><Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100">Login</Button></Link>
              <Link to="/signup"><Button className="bg-orange-600 hover:bg-orange-700 text-white">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.image || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                    alt={user?.fullname || '@user'}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className=''>
                  <div className='flex gap-2 space-y-2 p-2'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.image || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                        alt={user?.fullname || '@user'}
                      />
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>{user?.fullname}</h4>
                      <p className='text-sm text-zinc-500'>{user?.profile?.bio || 'No bio available'}</p>
                    </div>
                  </div>
                  <div className='flex flex-col my-2 text-zinc-600 border-t border-zinc-200 pt-2'>
                    {user?.role === 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer hover:bg-zinc-100 p-2 rounded-md'>
                        <User2 className="h-4 w-4" />
                        <Button variant="link" className="text-left hover:text-orange-500"><Link to="/profile">View Profile</Link></Button>
                      </div>
                    )}
                    <div className='flex w-fit items-center gap-2 cursor-pointer hover:bg-zinc-100 p-2 rounded-md'>
                      <LogOut className="h-4 w-4" />
                      <Button onClick={logoutHandler} variant="link" className="text-left hover:text-orange-500">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <button
          className='lg:hidden text-2xl text-zinc-600'
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          &#9776;
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-zinc-50 py-4 px-4 border-b border-zinc-200'>
          <ul className='flex flex-col gap-4'>
            {renderNavLinks()}
            {!user ? (
              <div className='flex flex-col items-start gap-2'>
                <Link to="/login"><Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-100 w-full">Login</Button></Link>
                <Link to="/signup"><Button className="bg-orange-600 hover:bg-orange-700 text-white w-full">Signup</Button></Link>
              </div>
            ) : (
              <div className='flex flex-col items-start gap-2'>
                <Link to="/profile">
                  <Button variant="link" className="text-left hover:text-orange-500">View Profile</Button>
                </Link>
                <Button onClick={logoutHandler} variant="link" className="text-left hover:text-orange-500">Logout</Button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;