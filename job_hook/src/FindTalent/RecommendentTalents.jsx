import React from 'react'
import { talents } from '../Data/TalentData'
import TalentCard from './TalentCard'

const RecommendentTalents = () => {
  return (
    <div >
        <div className='text-2xl font-semibold p-4'>Recommended Talents</div>
      <div className='mx-5  flex flex-col gap-y-4'>
        {
          talents.slice(0,3).map((item, index) => (
            <TalentCard key={index} {...item} />
          ))
        }
      </div>
    </div>
  )
}

export default RecommendentTalents

