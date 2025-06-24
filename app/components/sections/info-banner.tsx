import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const InfoImageBanner = () => {
  return (
    <section className='relative'>
        <div>
            <Image src='/images/banner-images/info-banner.webp' height={700} width={1920} alt='Image'/>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center max-w-96 gap-2'>
                <span>LOS ANGELES</span>
                <h2 className='text-4xl mt-1'>The <em>Flagship</em> Store</h2>
                <p className='text-center'>Welcome to the ultimate luxury experience. Choose the perfect solid gold gifts in person.</p>
                <Link className='uppercase underline text-lg underline-offset-2 mt-4' href={''}>Shop in store</Link>
            </div>
        </div>
    </section>
  )
}

export default InfoImageBanner