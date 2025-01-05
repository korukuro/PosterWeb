import React from 'react'

const Footer = () => {
  return (
    <div className='relative h-[40rem]' style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
      <div className='fixed h-[40rem] w-full bottom-0 bg-slate-600'>
        <h1 className='flex justify-center items-center'>Hello</h1>
      </div>
    </div>
        
  )
}

export default Footer
