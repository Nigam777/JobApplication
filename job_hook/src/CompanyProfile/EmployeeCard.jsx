import React from 'react'
import TalentCard from '../FindTalent/TalentCard'
import { talents } from "../Data/TalentData";

const EmployeeCard = () => {
  return (
    <div>
       <div className="mt-10 flex flex-wrap gap-5 justify-evenly">
          {talents.map((item, index) => (
            <TalentCard key={index} {...item} />
          ))}
        </div>
    </div>
  )
}

export default EmployeeCard
