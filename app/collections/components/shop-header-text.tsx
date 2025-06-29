import React from 'react'

type Collection ={
    id: number
    name: string
    description: string
    slug: string
}

type Props = {
    slug: string 
}

const ShopHederText = async({ slug}: Props) => {

   const res = await fetch(`http://localhost:3000/api/collections/collection/${slug}`);

    if (!res.ok) {
      console.error(`Failed to fetch collection for slug: ${slug}. Status: ${res.status}`);
      return null;
    }

    const collection: Collection = await res.json();


  return (
    <>
    {
        slug === 'all' 
        ? (
        <>
            <h2 className='text-primary text-4xl uppercase mb-4'>Shop All</h2>
            <p className='text-sm text-primary leading-[18px]'>
                Clean, gentle and results-driven essentials, inspired 
                <br/>by Nordic nature. Dermatologist-Tested.
            </p>
        </>
            )
        : (<>
        <h2 className='text-primary text-4xl uppercase mb-4'>{collection?.name}</h2>
            <p className='text-sm text-primary leading-[18px] max-w-[320px]'>
                {collection?.description}
            </p>
        </>)
    }
          
    </>
  )
}

export default ShopHederText