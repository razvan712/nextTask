"use client"
import fetcher from '@/services/apiServices'
import { baseUrl } from '@/utils/config'
import React from 'react'
import useSWR from 'swr'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation'


const CreateProduct = () => {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data: categories, isLoading } = useSWR<any>(`${baseUrl}/categories`, fetcher)



    const onSubmit = async (data: any) => {
        try {
            const formdata = {
                title: data.title,
                description: data.description,
                price: parseFloat(data.price),
                categoryId: data.categoryId,
                images: [data.images]
            }
            const response = await axios.post(`${baseUrl}/products`, formdata);
            console.log(response.data);
            if(response.status === 201){
                router.push('/')
            }
            // Handle success
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };


    return (
        <div className="container mx-auto my-8 px-4">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Product Name */}
                    <div className="sm:col-span-4">
                        <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                        <div className="mt-2">
                            <input type="text" id="title" {...register("title", { required: true })} className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${errors.title ? 'border-red-500' : ''}`} placeholder="Product Name" />
                            {errors.title && <p className="text-red-500 text-xs mt-1">Product Name is required</p>}
                        </div>
                    </div>
                    {/* Description */}
                    <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="mt-2">
                            <textarea id="description" {...register("description", { required: true })} rows={3} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.description ? 'border-red-500' : ''}`} placeholder="Description"></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">Description is required</p>}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
                    </div>
                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="categoryId" {...register("categoryId", { required: true })} className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.category ? 'border-red-500' : ''}`}>
                            <option>Select Category</option>
                            {
                                categories && categories.map((category: any) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                        {errors.categoryId && <p className="text-red-500 text-xs mt-1">Category is required</p>}
                    </div>
                    {/* Price */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="text" id="price" {...register("price", { required: true, pattern: /^[0-9]+$/ })} className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${errors.price ? 'border-red-500' : ''}`} placeholder="Price" />
                        {errors.price && <p className="text-red-500 text-xs mt-1">Price is required and must be a number</p>}
                    </div>
                    {/* Product Image */}
                    <div className="mb-4">
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input type="text" id="images" {...register("images", { required: true })} className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.productImage ? 'border-red-500' : ''}`} />
                        {errors.productImage && <p className="text-red-500 text-xs mt-1">Product Image is required</p>}
                    </div>
                    {/* Submit Button */}
                    <div className="mt-6">
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct