import React from 'react'
import JobHistory from '../JobHistory/JobHistory'
const JobHistoryPage = () => {
  return (
    <div>

      <div className='font-semibold text-2xl p-4  mt-3' id='add'>
        <h1><span className=' text-bright-sun-400'>Job</span> History</h1>
      </div>
      <div>
        <JobHistory />
      </div>
    </div>
  )
}

export default JobHistoryPage