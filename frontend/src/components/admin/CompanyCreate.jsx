import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Your Company Name</h1>
          <p className="text-gray-500 text-sm">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            placeholder="JobHunt, Microsoft, etc."
            className="mt-2"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex gap-3 flex-wrap items-center justify-start">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button
            disabled={!companyName.trim()}
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate