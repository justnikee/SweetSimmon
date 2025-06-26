import React from 'react'
import ImageBlock from './product-img-block'
import ProductInfo from './product-info-block'

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
  images: string[]

}

const ProductComponent = ({product}: {product: Product}) => {
  return (
    <div className='bg-white'>
        <div className='container flex'>
           <ImageBlock images={product.images}/>
           <div>
             <ProductInfo product={product}/>
           </div>
        </div>
       
    </div>
  )
}




export default ProductComponent