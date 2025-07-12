import { Avatar } from '@mantine/core'
import React from 'react'
import { Rating, Group, Stack } from '@mantine/core';
import { testimonials } from '../Data/Data';

const Testimonial = () => {
  return (
    <>
    <div className='mt-20 pb-3'>
       <div className='text-center text-mine-shaft-100 font-semibold mb-3 text-4xl '>What <span className='text-bright-sun-300 '> Users</span> Says About Us</div>
    </div>
    <div className=' flex justify-between'>
      {
        testimonials.map((item,index)=>{
          return(
            <div key={index} className=' border w-[20%] flex flex-col p-5  m-4 border-bright-sun-400 rounded-lg items-center'>
              <div className='flex gap-2 items-center'>
                <Avatar src="/Working/avatar1.png"/>
                <div>
                  <div className='text-mine-shaft-100 text-lg'>{item.name}</div>
                  <Rating size="md" readOnly value={item.rating} fractions={2} />
                </div>
                
              </div>
              <div className='text-sxl text-mine-shaft-100 mt-3 text-center'>
                {item.testimonial}
              </div>
            </div>
          )
        })
      }
    </div>
    </>
  )
}

export default Testimonial



