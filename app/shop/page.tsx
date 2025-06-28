import React from 'react'
import ShopCards from './components/shop-cards';

type Product = {
    id: number
    title: string
    images: string[]
    price: number
}

const page = async() => {

  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  const products: Product[] = data

  return (
    <div className='bg-white'>
        <div className='px-20 py-10'>
          <h2 className='text-black text-4xl italic'>All Jewelry</h2>
          <span className='text-black'>{products.length} Items</span>
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-0.5'>
        {
            products.map((product)  => (
                <ShopCards
                    key={product.id} 
                    id={product.id} 
                    title={product.title} 
                    price={product.price} 
                    images={product.images} 
                />
            ))
        }
        </div> 
    </div>
  )
}

export default page