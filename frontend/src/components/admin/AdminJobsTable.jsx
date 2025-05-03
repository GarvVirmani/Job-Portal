import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    })
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-300 text-sm">
        <TableCaption className="text-gray-600 py-4">
          List of recently posted jobs
        </TableCaption>
        <TableHeader className="bg-rose-100 text-gray-800">
          <TableRow>
            <TableHead className="px-4 py-2">Company Name</TableHead>
            <TableHead className="px-4 py-2">Job Role</TableHead>
            <TableHead className="px-4 py-2">Posted Date</TableHead>
            <TableHead className="px-4 py-2 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-gray-50 transition-all duration-300"
            >
              <TableCell className="px-4 py-3">{job?.company?.name}</TableCell>
              <TableCell className="px-4 py-3">{job?.title}</TableCell>
              <TableCell className="px-4 py-3">
                {job?.createdAt.split('T')[0]}
              </TableCell>
              <TableCell className="px-4 py-3 text-right">
                <Popover>
                  <PopoverTrigger className="hover:text-rose-600 transition-colors">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-3 rounded-lg shadow-md bg-white border border-gray-300">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 text-gray-700 hover:text-rose-600 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-sm">Edit Job</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 text-gray-700 hover:text-rose-600 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 mt-1 transition"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable