import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

type Props = {
    image: string
    heading: string
    url: string
}

const Card = ({image, heading, url}: Props) => {
  return (
    <div className='w-1/4 border-r border-l border-gray-950'>
        <Link className='relative' href={url}>
        <Image className='w-full' src={image} height={600} width={300} alt="Product Image" />
        <h4 className='text-center absolute bottom-8 z-10 left-1/2 text-black text-sm underline underline-offset-3'>{heading}</h4>
        </Link>
    </div>
  )
}

export default Card