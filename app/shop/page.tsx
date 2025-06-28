import React from 'react'
import ShopCards from './components/shop-cards';
import ShopFilter from './components/shop-filter';

type Product = {
    id: number
    title: string
    images: string[]
    price: number
}

const page = async() => {

  const response = await fetch('http://localhost:3000/api/products', {
    next: {revalidate: 3600}
  });
  const data = await response.json();
  const products: Product[] = data

  return (
    <div className='bg-white'>
        <div className='px-20 py-10'> 
          <h2 className='text-primary text-4xl uppercase mb-4'>Shop All</h2>
          <p className='text-sm text-primary leading-[18px]'>Clean, gentle and results-driven essentials, inspired <br/>by Nordic nature. Dermatologist-Tested.</p>
          <ShopFilter/>
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