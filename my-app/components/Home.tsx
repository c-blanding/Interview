import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[600px]'>
        <p>Click on the button below to check out the documents</p>
        <Button asChild>
            <Link href="/docs">Click Me</Link>
        </Button>
    </div>
  )
}

export default Home