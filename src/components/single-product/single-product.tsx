import Link from 'next/link'
import React, { FC } from 'react'


type Props = {
    id: number,
    title: string,
    price: number | string,
    image?: string
}

const SingleProduct: FC<Props> = ({
    id,
    price,
    title,
    image
}) => {

    return (
        <Link href={`/product/[id]`} as={`/product/${id}`} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img src={image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
        </Link>
    )
}

export default SingleProduct