import { Button, TextInput } from '@mantine/core'
import React from 'react'

const  Subscribe = () => {
  return (
    <div className='mt-28 flex items-center bg-mine-shaft-700 p-8 rounded-lg mx-20 py-6  justify-around '> 
        <div className='font-semibold w-2/5 text-4xl text-mine-shaft-100 text-center'>
        Never Wants to Miss Any <span className='text-bright-sun-400'>Job News?</span> 
        </div>
        <div  className='flex  !items-center gap-5 bg-mine-shaft-500 px-6 py-4 rounded-xl '>
            <TextInput placeholder='XYZ@gmail.com' 
             variant='unstyled'
            size='lg'
            className=' rounded-lg p-1 text-zinc-50 [&_input]:text-zinc-50 px-4 
            
            '/>
           <Button className='!rounded-lg' color="yellow" variant="filled">Subscribe</Button>
        </div>
    </div>
  )
}

export default  Subscribe