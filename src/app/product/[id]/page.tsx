"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { baseUrl } from '@/utils/config'
import fetcher from '@/services/apiServices'


const SingleProduct = () => {

  const params = useParams<{ id: string }>()

  const [selectedImage, setSelectedImage] = useState('')

  console.log(params.id)

  const { data, isLoading } = useSWR<any>(`${baseUrl}/products/${params.id}`, fetcher)



  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  console.log("", data)

  return (
    <>
      <button>Back</button>
      <div className="container mx-auto flex flex-wrap py-12">
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
          <div className="w-full relative mb-4">
            <img
              src={selectedImage ? selectedImage : data?.images[0]}
              alt="Product" className="w-full h-auto rounded-lg" />
          </div>
          <div className="w-full flex flex-wrap">
            {
              data?.images?.map((img: any) => (
                <div key={img} onClick={() => setSelectedImage(img)} className={`w-1/5 px-1 ${selectedImage === img ? ' border-2 border-purple-950' : ''}`}>
                  <img src={img} alt="Product" className="w-full h-auto rounded-lg mb-2 cursor-pointer" />
                </div>
              ))
            }

          </div>
        </div>

        <div className="w-full lg:w-1/2 px-4">
          <h2 className="text-3xl font-semibold mb-4">{data.title}</h2>
          <p className="text-gray-700 mb-4">{data.description}</p>
          <div className="mb-4">
            <span className="text-gray-600">Category:</span>
            <span className="text-gray-800 font-semibold">{data?.category?.name}</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-600">Price:</span>
            <span className="text-gray-800 font-semibold">${data.price}</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </>


  )
}

export default SingleProduct