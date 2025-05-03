import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <Table>
        <TableCaption className="text-sm text-zinc-500 mt-4">A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left font-medium text-zinc-700">Date</TableHead>
            <TableHead className="text-left font-medium text-zinc-700">Job Role</TableHead>
            <TableHead className="text-left font-medium text-zinc-700">Company</TableHead>
            <TableHead className="text-right font-medium text-zinc-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-zinc-500">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-zinc-50 transition-colors">
                <TableCell className="py-2 text-zinc-600">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="py-2 text-zinc-600">{appliedJob.job?.title}</TableCell>
                <TableCell className="py-2 text-zinc-600">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right py-2">
                  <Badge
                    className={`
                      ${appliedJob?.status === "rejected"
                        ? 'bg-red-400 text-white'
                        : appliedJob.status === 'pending'
                          ? 'bg-zinc-400 text-white'
                          : 'bg-green-400 text-white'
                      }
                    `}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;