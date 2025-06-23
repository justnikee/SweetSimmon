import React from 'react'
import Card from '../card'

type Props = {}

const Products = (props: Props) => {
  return (
    <section>
        <div className='flex'>
            <Card heading='Earing' image='/images/product-images/hp-prod-image.webp' url={'#'}/>
            <Card heading='Earing' image='/images/product-images/hp-prod-image.webp' url={'#'}/>
            <Card heading='Earing' image='/images/product-images/hp-prod-image.webp' url={'#'}/>
            <Card heading='Earing' image='/images/product-images/hp-prod-image.webp' url={'#'}/>
        </div>
    </section>
  )
}

export default Products