import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
/* import { notFound } from "next/navigation"; */

const seedProducts = initialData.products;

interface Props {
    params: {
        id: Category;
    }
}

export default async function ({ params }: Props) {

    const { id } = await params;
    const products = seedProducts.filter(product => product.gender === id);

    const labels: Record<Category, string> = {
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
                title={`Articles from ${labels[id]}`}
                subtitle="All the products"
                className="mb-2" />

            <ProductGrid
                products={products}
            />
        </>
    );
}