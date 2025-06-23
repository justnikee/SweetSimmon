import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import image1 from "/public/images/banner-images/Artboard_1-1.webp"

const Banner = () => {
  return (
    <section className='-mt-14 z-0'>
        <div className=''>
          <BannerSlides/>
        </div>
    </section>
  )
}

function BannerSlides(){
    return(
        <div className='h-screen w-full relative'>
           <Image className='w-full h-full' src={image1} height={700} width={1920} alt='Hero Image' /> 
           <div className='absolute bottom-10 left-10'>
             <h2 className='text-4xl mb-2'>–Of <em>the</em> Sea</h2>
             <p className='text-sm mb-3'>From shell to silver, shaped by memory. Made to hold what’s precious.</p>
             <Link className='uppercase underline text-lg underline-offset-2' href={''}>Shop the sea collection</Link>
           </div>
        </div>
    )
}

export default Banner