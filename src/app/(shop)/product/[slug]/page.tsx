export const revalidate = 604800; //7 days

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { montserratAlternates } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { slug } = await params

    // fetch data
    const product = await getProductBySlug(slug)

    // optionally access and extend (rather than replace) parent metadata
    /* const previousImages = (await parent).openGraph?.images || [] */

    return {
        title: (product?.title ?? 'Product not found') + 'TESLO|SHOP',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Product not found',
            description: product?.description ?? '',
            //images: [], // https://mydomainweb.com/products/prod-1/image.png
            images: [`/products/${product?.images[1]}`],
        },
    }
}

export default async function ({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

            {/* SlideShow */}
            <div className="col-span-1 md:col-span-2 ">

                {/* MOBILE SLIDESHOW */}
                <ProductMobileSlideShow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />

                {/* DESKTOP SLIDESHOW */}
                <ProductSlideShow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>


            {/* Details */}
            <div className="col-span-1 px-5 ">

                <StockLabel slug={product.slug} />

                <h1 className={`${montserratAlternates.className} antialised font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5"> ${product.price}</p>

                {/* size selector */}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/* quantity selector */}
                <QuantitySelector
                    quantity={2} />

                {/* button */}
                <button className="btn-primary my-5">Add to Cart</button>

                {/* description */}
                <h3 className="font-bold text-sm"> Description</h3>
                <p className="font-light"> {product.description} </p>
            </div>

        </div>
    );
}