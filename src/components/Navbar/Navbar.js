import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const url = `https://auth.delta.nitt.edu/authorize?client_id=xeD~vJrDuRV_vJvV&redirect_uri=http://localhost:3000/callback&response_type=code&grant_type=authorization_code&state=random_string&scope=email+openid+profile+user&nonce=random_string`
  return (
    <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
			<Link href='/' className='flex items-center justify-center h-20 my-4'>
				<Image src='/logo.png' alt='LeetClone' height={100} width={60} />
			</Link>
			<div className='flex items-center'>
				<button
					className='bg-brand-green text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-green hover:bg-white hover:border-2 hover:border-brand-green border-2 border-transparent
                transition duration-300 ease-in-out
                '
				>
					<Link href={url}>Sign In</Link>
				</button>
			</div>
		</div>
  )
}

export default Navbar