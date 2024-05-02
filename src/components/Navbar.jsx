import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-violet-900 text-white h-14 px-6'>
        <div className="logo font-bold text-2xl">iTask</div>
        <ul className='flex gap-5 text-lg'>
            <li className='hover:font-bold transition-all cursor-pointer'>Home</li>
            <li className='hover:font-bold transition-all cursor-pointer'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
