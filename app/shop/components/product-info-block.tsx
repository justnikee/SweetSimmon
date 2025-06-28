import React from 'react'

type Product = {
  id: number
  title: string
  description: string
  price: number
}

const ProductInfo = ({product}: {product: Product}) => {
  return (
    <>
      <div className='text-primary flex flex-col gap-4'>
         <h2 className='text-3xl'>{product.title}</h2>
         <p>€{product.price}</p>
         <p className='text-sm leading-[18px] text-primary max-w-[500px]'>{product.description}</p>
         <button className='border-primary uppercase text-sm bg-[#a6ccef] w-fit px-8 py-3 rounded-full'>
         Add To Cart
         </button>
      </div>
    </>
  )
}

export default ProductInfo