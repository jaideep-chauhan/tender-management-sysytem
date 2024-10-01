import React from 'react'
import BidsTable from '@/components/tables/BidsTable'



export default function page() {



    return (
        <div className='space-y-4'>
            <div className='flex justify-between'>
                <h2 className='font-semibold'>Bids</h2>
                <p></p>
            </div>
            <BidsTable />
        </div>
    )
}
