import React from 'react'
import ShopCards from '@/app/products/components/shop-cards';
import ShopFilter from '@/app/products/components/shop-filter';
import ShopHederText from '../components/shop-header-text';

type Product = {
    id: number
    title: string
    images: string[]
    price: number
}

type Category ={
    id: number
    name: string
    description: string
    slug: string
}

const page = async({params} : {params: {slug: string}}) => {

const {slug} = params
console.log(slug)

    let response 
    slug === 'all'
    ? response = await fetch(`http://localhost:3000/api/products`, { next: {revalidate: 3600} }) 
    : response = await fetch(`http://localhost:3000/api/collections/${slug}`, { next: {revalidate: 3600}})

    if(!response.ok){
      return console.log('collection dont exist')
    }

    const data = await response.json();
    const products: Product[] = data


  return (
    <div className='bg-white'>
        <div className='px-20 pt-10 pb-5'> 
          <ShopHederText slug={slug}/>
        </div>
        <ShopFilter/>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-0.5'>
        {
            products?.map((product)  => (
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