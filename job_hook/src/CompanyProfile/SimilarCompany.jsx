import React from 'react'
import { similar } from '../Data/Company'
import CompanyCard from './CompanyCard'
const SimilarCompany = () => {
  return (
    <div className=' flex flex-col items-center' >
        <div className='text-2xl font-semibold p-4 '>Similar <span className='text-bright-sun-400'>Companies</span></div>
      <div className='mx-5  flex flex-col gap-y-4'>
        {
          similar.map((company,index) => <div key={index}>
                 <CompanyCard {...company} />
          </div>
          )
        }
      </div>
    </div>
  )
}

export default SimilarCompany
