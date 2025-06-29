import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='bg-[#FAF7F2] py-2 z-10 relative'>
         <div className='container gap-2 hidden md:flex md:justify-between md:items-center'>

              <div className='flex gap-4'>
                 <Link className='text-[#4E342E] text-sm' href={"/"}>Home</Link>
                 <Link className='text-[#4E342E] text-sm' href={"/collections/all"}>Shop All</Link>
                 <Link className='text-[#4E342E] text-sm' href={"/about"}>About</Link>
              </div>
              <Link className='text-[#4E342E] text-4xl' href="/">SweetSimmooons</Link>
              <div className='flex gap-4'>
                <Link className='text-[#4E342E] text-sm' href={"/contact"}>Contact Us</Link>
                <Link className='text-[#4E342E] text-sm' href={"/account"}>Account</Link>
                <Link className='text-[#4E342E] text-sm' href={"/cart"}>Cart</Link>
              </div>
         </div>
    </header>
  )
}

function MobileMenu(){
    return(
        <div>

        </div>
    )
}

export default Header