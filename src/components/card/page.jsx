'use client'
import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation'

const Card = ({ product }) => {

  const router = useRouter()

  return (
    <section className="flex flex-col w-64 h-[440px] items-center justify-start m-3 border border-white rounded-lg " >

      <Image className="w-48 h-48 md:w-[90%] md:h-64 mt-2" src={product.image} alt={product.name} width={100} height={100} />

      <h2 className="text-2xl font-bold">Brand: {product.name}</h2>

      <p className="text-lg font-bold">${product.price}</p>
      {/*este div es para empujar el bóton hacía abajo lo más posible y así no queden unos más arriba que otros */}
      <div className="flex-grow"></div>
      <button
        className="w-[90%] h-10 bg-blue-500 text-white rounded-md m-5 hover:bg-blue-700 hover:scale-90"
        onClick={() => router.push(`/product/edit/${product.id}`)}
      >Edit this product</button>


    </section>
  )
}

export default Card