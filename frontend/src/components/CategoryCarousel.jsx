import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="w-full px-4 sm:px-6">
      <Carousel className="w-full max-w-xl mx-auto my-10 relative">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full bg-orange-600 text-white hover:bg-orange-700"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows are hidden on small screens */}
        <div className="hidden sm:block">
          <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
