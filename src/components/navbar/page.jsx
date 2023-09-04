'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

const Navbar = () => {



    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
            <h3>Next CRUD</h3>
            <ul className='flex justify-around items-center gap-6 '>
                <li className='home  '>
                    <Link href="/" legacyBehavior>
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/new" legacyBehavior>
                        <a>New Product</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about" legacyBehavior>
                        <a>About</a>
                    </Link>
                </li>
            </ul>
        </nav>

    )
}

export default Navbar