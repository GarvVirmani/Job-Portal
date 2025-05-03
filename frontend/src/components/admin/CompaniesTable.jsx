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
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter(company => {
        if (!searchCompanyByText) return true
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  return (
    <div className="overflow-x-auto">
      <Table className="bg-white rounded-xl shadow-md">
        <TableCaption className="text-gray-500">A list of your recently registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-gray-600">Logo</TableHead>
            <TableHead className="text-gray-600">Name</TableHead>
            <TableHead className="text-gray-600">Date</TableHead>
            <TableHead className="text-right text-gray-600">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map(company => (
            <TableRow
              key={company._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-gray-800">{company.name}</TableCell>
              <TableCell className="text-sm text-gray-500">
                {company.createdAt.split('T')[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="hover:text-rose-600 transition">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white border border-gray-200 shadow-lg">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-rose-600 cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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

export default CompaniesTable