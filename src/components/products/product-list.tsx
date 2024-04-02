import React, { FC } from 'react'
import SingleProduct from '../single-product/single-product'



type ProductListProps = {
    products: any
}


const ProductList: FC<ProductListProps> = (props: ProductListProps) => {
    const { products } = props
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {
                        products && products.map((product: any) => (
                            <SingleProduct
                                key={product.id}
                                id={product.id}
                                price={product?.price}
                                title={product?.title}
                                image={product?.images[0]}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList