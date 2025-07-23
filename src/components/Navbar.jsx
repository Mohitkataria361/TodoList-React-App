import React from 'react'

const Navbar = () => {
  return (
   <div className='fixed top-0 left-0 w-full z-50 bg-blue-500 flex justify-between items-center px-6 py-4 shadow-md transition-all duration-500'>
  <span className='text-xl font-bold text-white transition-all duration-500 hover:scale-105 hover:text-yellow-200 cursor-pointer'>
    iTask
  </span>
  <ul className='flex gap-10 text-white'>
    <li className='cursor-pointer transition-all duration-500 ease-in-out hover:underline hover:font-bold hover:text-yellow-200 hover:scale-105'>
      Home
    </li>
    <li className='cursor-pointer transition-all duration-500 ease-in-out hover:underline hover:font-bold hover:text-yellow-200 hover:scale-105'>
      Contact Us
    </li>
    <li className='cursor-pointer transition-all duration-500 ease-in-out hover:underline hover:font-bold hover:text-yellow-200 hover:scale-105'>
      About Us
    </li>
  </ul>
</div>


  )
}

export default Navbar