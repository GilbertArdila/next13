"use client"

import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const NewProduct = ({ params }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()

  //guardar datos de las categorias
  const [categories, setCategories] = useState([])
  //guardar datos del producto obtenido por id
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')





  useEffect(() => {
    if (params.id !== undefined) {
      fetch(`/api/products/${params.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setName(data.product.name)
          setImage(data.product.image)
          setPrice(data.product.price)
          setCategory(data.product.categoryId)
        })
    }

    fetch(`/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories)
      })
  }, [params.id])


  //obtener la categoria del producto por su id
  const productCategory = categories?.find((item) => item.id === category)


  //crear o actualizar producto en onsubmit
  const onSubmit = async data => {

    if (params.id === undefined) {

      await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          price: price,
          categoryId: category,
          image: image,

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      router.refresh()
      router.push('/')

    }
    else {
      await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: name,
          price: price,
          categoryId: category,
          image: image,

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      router.refresh()
      router.push('/')
    }



  }



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
          type="text" placeholder="name" {...register("name", { required: true })}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }
          }

        />
        {errors.name && <span className='mb-2 text-lg font-bold border-2 border-red-600 rounded-md px-2 text-red-500 bg-white'>The field name is required</span>}

        <label
          className='mb-2 text-lg font-bold'
          htmlFor="image">image url</label>
        <input
          className='mb-2 w-[90%] h-10 border-2 border-gray-300 rounded-md px-2 text-black font-mono '
          type="text" placeholder="image" {...register("image", { required: true })}
          value={image}
          onChange={(e) => {
            setImage(e.target.value)
          }
          }
        />
        {errors.image && <span className='mb-2 text-lg font-bold border-2 border-red-600 rounded-md px-2 text-red-500 bg-white'>The field image url is required</span>}

        <label
          className='mb-2 text-lg font-bold'
          htmlFor="price">Price</label>
        <input
          className='mb-2 w-[90%] h-10 border-2 border-gray-300 rounded-md px-2 text-black font-mono '
          type="number" placeholder="price" {...register("price", { required: true })}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }
          }
        />
        {errors.price && <span className='mb-2 text-lg font-bold border-2 border-red-600 rounded-md px-2 text-red-500 bg-white'>The field price is required</span>}

        <label
          className='mb-2 text-lg font-bold'
          htmlFor="category">Category</label>
        <select
          className='w-[90%] h-10 border-2 border-gray-300 rounded-md px-2 text-black font-mono'
          {...register("category")}
          onChange={(e) => { setCategory(e.target.value) }}
        >

          {params.id === undefined ? <option >Select a category</option>
            : <option value={productCategory?.id}>{productCategory?.name}</option>
          }


          {categories.length != 0 && categories?.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>


        <button
          className='w-[90%] h-10 bg-blue-500 text-white rounded-md mt-5'
          type="submit">Submit</button>

        {params.id !== undefined && <button
          className='w-[90%] h-10 bg-red-500 hover:bg-red-700 text-white rounded-md mt-5'
          type="button"
          onClick={async () => {
            await fetch(`/api/products/${params.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            router.refresh()
            router.push('/')

          }
          }>Delete</button>}
      </form>
    </div>
  )
}

export default NewProduct