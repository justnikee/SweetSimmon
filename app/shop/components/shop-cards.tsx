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
    <div className='bg-[#E7E4DE]'>
       <Link href={`/shop/${id}`}>
       {
        images.slice(0, 1).map(image => (
          <Image className='lg:h-[600px] object-contain' src={image} height={800} width={800} alt={title} />
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