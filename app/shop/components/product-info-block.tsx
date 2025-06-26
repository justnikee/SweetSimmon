import React from 'react'

type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  brand: string
  weight: string
  dimensions: {
    width: number
    height: number
    depth: number
  }
  shippingInformation: string
  availabilityStatus: string
}

const ProductInfo = ({product}: {product: Product}) => {
  return (
    <>
      <div className='text-black flex flex-col gap-4'>
         <span>Prodcuts/{product.category}</span>
         <h2>{product.title}</h2>
         <p>Rs{product.price}</p>
         <button>
         {
            product.availabilityStatus ? "Add To Cart" : "Out of Stock"
         }
         </button>
         <span>{product.availabilityStatus ? "In Stock - Ready to ship" : "Out of Stock"}</span>
         <ul>
            <h4>Details</h4>
            <ul>Depth: {product.dimensions.depth}</ul>
            <ul>Height: {product.dimensions.height}</ul>
            <ul>Width: {product.dimensions.width}</ul>
         </ul>
      </div>
    </>
  )
}

export default ProductInfo