import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

type Product = {
    id: number
    title: string
    images: string[]
    price: number
}

const ShopCards = ({id, title, images, price}: Product) => {
  return (
    <div className=''>
       <Link className='relative group' href={`/shop/${id}`}>
       {
        images.slice(0, 2).map((image, index) => (
          <Image key={id} className={`lg:h-[600px] ease-in-out duration-500 transition-opacity object-contain ${index === 0 ? 'relative z-0' : 'absolute top-0 left-0 z-10 opacity-0 group-hover:opacity-100'}`} src={image} height={800} width={800} alt={title} />
        ))
       }
       <div className='bg-white py-5 px-2'>
       <h3 className='text-black'>{title}</h3>
       <span className='text-gray-600 block'>${price}</span>
       </div>
       </Link>
    </div>
  )
}

export default ShopCards