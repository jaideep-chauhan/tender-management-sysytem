import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex justify-center items-center gap-4 h-screen'>
        <Link href="/tenders">
        <Button size="lg">Go to Admin Portal</Button>
        </Link>
        <Link href="/userarea">
        <Button size="lg">Go to User Area</Button>
        </Link>
    </div>
  )
}
