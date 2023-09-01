"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const NewProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const [categories, setCategories] = useState([])


  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch('http://localhost:3000/api/categories')

      const data = await response.json()
      return setCategories(data)
    }
    getCategories()
  }, [])



  return (
    <div className='flex justify-center items-center w-full h-full'>
      <form className='flex flex-col w-full md:w-1/2 h-1/2 justify-center items-center mt-20'
        onSubmit={handleSubmit(onSubmit)}>

        <h1 className='text-2xl font-bold mb-5'>New Product</h1>

        <label
          className='mb-2 text-lg font-bold'
          htmlFor="name">Name</label>
        <input
          className='mb-2 w-[90%] h-10 border-2 border-gray-300 rounded-md px-2 text-black font-mono'
          type="text" placeholder="name" {...register("name", { required: true })} />
        {errors.name && <span className='mb-2 text-lg font-bold border-2 border-red-600 rounded-md px-2 text-red-500 bg-white'>The field name is required</span>}

        <label
          className='mb-2 text-lg font-bold'
          htmlFor="image">image url</label>
        <input
          className='mb-2 w-[90%] h-10 border-2 border-gray-300 rounded-md px-2 text-black font-mono '
          type="text" placeholder="image" {...register("image", { required: true })} />
        {errors.image && <span className='mb-2 text-lg font-bold border-2 border-red-600 rounded-md px-2 text-red-500 bg-white'>The field image url is required</span>}

        <label
          className='mb-2 text-lg font-bold'
          htmlFor="price">Price</label>
        <input
          className='mb-2 w-[90%] h-10 border-2 border-gray-300 rounded-md px-2 text-black font-mono '
          type="number" placeholder="price" {...register("price", { required: true })} />
        {errors.price && <span className='mb-2 text-lg font-bold border-2 border-red-600 rounded-md px-2 text-red-500 bg-white'>The field price is required</span>}

        <label
          className='mb-2 text-lg font-bold'
          htmlFor="category">Category</label>
        <select
          className='w-[90%] h-10 border-2 border-gray-300 rounded-md px-2 text-black font-mono'
          {...register("category")}>
            
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>


        <button
          className='w-[90%] h-10 bg-blue-500 text-white rounded-md mt-5'
          type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewProduct