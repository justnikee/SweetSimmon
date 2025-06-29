import { Category } from '@/app/generated/prisma';
import Link from 'next/link';
import React from 'react'

type Props ={
     collection: Category[]
}

const ShopFilter = async() => {

   const res = await fetch('http://localhost:3000/api/collections');
   const collection: Category[] = await res.json();


  return (
    <div className='border-t border-b border-[#A3BFDB] py-4 px-20 mb-5'>
       <div className='flex gap-6'>
      <Link className='text-sm leading-[18px] text-primary' href='/collections/all'>Shop All</Link>
      {
        collection.map((cat: Category, i: number) => (
            <Link key={i} className='text-sm leading-[18px] text-primary' href={cat.slug}>{cat.name}</Link>
        ))
      }
       </div>
    </div>
  )
}

export default ShopFilter