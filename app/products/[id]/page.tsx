import React from 'react'
import ProductComponent from '../components/product-component'


type Params = {
   params: {
    id: string
   }
}

const page = async({params}: Params) => {
  const { id } = await params 
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    next: {revalidate: 3600}
  });
  const data = await res.json();
  const product = await data.product
  return (
    <div className='py-20'>
      <div className='max-w-[1440px] px-10 m-auto'>
          <ProductComponent product={product}/> 
      </div> 
    </div>
  )
}

export default page