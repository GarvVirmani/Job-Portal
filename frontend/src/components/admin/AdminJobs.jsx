import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Input
            className="w-full sm:w-96 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none text-sm"
            placeholder="Search by job title or role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={() => navigate("/admin/jobs/create")} 
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300"
          >
            Post New Job
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs