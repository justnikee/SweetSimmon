import React from 'react'
import ProductComponent from '../components/product-component'


type Params = {
   params: {
    id: string
   }
}

const page = async({params}: Params) => {
  const { id } = params 
  console.log(id, "slug")
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();
  console.log(product)
  return (
    <div>
        <ProductComponent product={product}/>
    </div>
  )
}

export default page