import Link from 'next/link'
import React from 'react'

const VideoBanner = () => {
  return (
    <section className='relative'>
        <div>
        <video
        className="w-full h-auto"
        autoPlay
        muted
        loop
        poster=""
      >
        <source src="/videos/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='absolute bottom-10 left-10 flex flex-col'>
        <h2 className='text-white text-4xl'>Eternal Commitment—Evolving Traditions</h2>
        <Link className='uppercase underline text-lg underline-offset-2 mt-4' href={''}>Shop Bridal</Link>
      </div>
        </div>
    </section>
  )
}

export default VideoBanner