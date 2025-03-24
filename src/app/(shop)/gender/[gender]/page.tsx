export const revalidate = 60; //60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";
/* import { notFound } from "next/navigation"; */


interface Props {
    params: {
        gender: string;
    },
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function ({ params, searchParams }: Props) {

    const { gender } = await params;
    const resolvedParams = await searchParams;
    const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;

    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });


    //! when we don't have any products -> go to home page
    if (products.length === 0) {
        redirect(`/gender/${gender}`)
    }

    const labels: Record<string, string> = {
        'men': 'for men',
        'women': 'for women',
        'kid': 'for plebes',
        'unisex': 'for everyone'
    }


    /* if (id === 'kids') {
        notFound();
    } */

    return (
        <>
            <Title
                title={`Articles from ${labels[gender]}`}
                subtitle="All the products"
                className="mb-2" />

            <ProductGrid
                products={products}
            />

            <Pagination totalPages={totalPages} />
        </>
    );
}