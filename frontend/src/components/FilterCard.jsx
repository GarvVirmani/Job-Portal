import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-₹40k", "₹42k-₹1 Lakh", "₹1 Lakh - ₹5 Lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className='w-full bg-white p-4 rounded-md shadow-sm'>
      <h1 className='font-semibold text-lg text-zinc-800 mb-4'>Filter Jobs</h1>
      <hr className='mb-4 border-zinc-200' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className='font-semibold text-md text-zinc-700 mb-2'>{data.filterType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className='flex items-center space-x-2 py-1' key={itemId}>
                  <RadioGroupItem value={item} id={itemId} className="peer appearance-none w-4 h-4 border border-zinc-300 rounded-full checked:bg-orange-500 checked:border-orange-500 focus:ring-2 focus:ring-orange-500" />
                  <Label htmlFor={itemId} className="text-zinc-600 peer-checked:font-semibold">{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;