### LOADING THE PRODUCT BY SLUG

(src\actions\product\get-product-by-slug.ts)
<!-- 'use server';

import prisma from "@/lib/prisma";

export const getProductBySlug = async(slug: string) => {
 try {
    const product = await prisma.product.findFirst({
        include:{
            ProductImage:{
                select:{
                    url: true
                }
            }
        },
        where: {
            slug: slug,
        }
    })

    if (!product) return null;

    return {
        ...product,
        images: product.ProductImage.map( image => image.url)
    };
    
 } catch (error) {
    console.log(error);
    throw new Error('Error getting product by slug');
 }
} -->

now we can remove the hardcoded seed data from (src\app\(shop)\product\[slug]\page.tsx)
<!-- import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { montserratAlternates } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    console.log(product);

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
} -->

to revalidate the cache in seven days 
<!-- export const revalidate = 604800; //7 days

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { montserratAlternates } from "@/config/fonts";
import { notFound } from "next/navigation"; -->

### Client - side STOCKLABEL COMPONENT COOL
(src\components\product\stock-label\StockLabel.tsx)
<!-- 'use client';

import { montserratAlternates } from "@/config/fonts"

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {




    return (
        <h1 className={`${montserratAlternates.className} antialised font-bold text-xl`}>
            Stock: 150
        </h1>
    )
} -->


now we can import this component 

(src\app\(shop)\product\[slug]\page.tsx)

<!-- {/* Details */}
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
            </div> -->

now to use this StockLabel component we need to create a new action, get-stock-by-slug, to read the stocks from the db 

(src\actions\product\get-stock-by-slug.ts)

<!-- 'use server';

import prisma from "@/lib/prisma";


export const getStockBySlug = async(slug: string): Promise<number> => {

    try {
        const stock = await prisma.product.findFirst({
            where: {slug},
            select: {inStock: true}
        });

        return stock?.inStock ?? 0;
        
    } catch (error) {
        console.log(error);
        return 0;
    }
} -->



now to use it on our component: 

(src\components\product\stock-label\StockLabel.tsx)

<!-- 'use client';

import { getStockBySlug } from "@/actions";
import { montserratAlternates } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        //TODO: call the server actions
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
    }


    return (
        <h1 className={`${montserratAlternates.className} antialised font-bold text-lg`}>
            Stock: {stock}
        </h1>
    )
} -->

### ADDING A LOADING on the stock LABEL :D!!!! 💡💡💡

(src\components\product\stock-label\StockLabel.tsx)

<!-- 'use client';

import { getStockBySlug } from "@/actions";
import { montserratAlternates } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        //TODO: call the server actions
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
    }


    return (
        <>
            <h1 className={`${montserratAlternates.className} antialised font-bold text-lg`}>
                Stock: {stock}
            </h1>

            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            <h1 className={`${montserratAlternates.className} antialised font-bold text-lg bg-gray-200 animate-pulse`}>
                &nbsp;
            </h1>
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        </>
    )
} -->

too see this animation we can create a delay 

(src\utils\sleep.ts)

<!-- export const sleep = (seconds: number = 1) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
} -->

and add this sleep in the ()

<!-- 'use server';

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";


export const getStockBySlug = async(slug: string): Promise<number> => {

    try {
        !!!!!!!!!!!!!!!
        await sleep(3);
        !!!!!!!!!!!!!!!

        const stock = await prisma.product.findFirst({
            where: {slug},
            select: {inStock: true}
        });

        return stock?.inStock ?? 0;

    } catch (error) {
        console.log(error);
        return 0;
    }
} -->

to show our skeleton now we can go back into the (src\components\product\stock-label\StockLabel.tsx)

<!-- 'use client';

import { getStockBySlug } from "@/actions";
import { montserratAlternates } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock();
    }, []);

    const getStock = async () => {
        //TODO: call the server actions
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
        !!!!!!!!!!!!!!!!!!!!
        setIsLoading(false);
        !!!!!!!!!!!!!!!!!!!!
    };


    return (
        <>
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {
                isLoading ? (
                    <h1 className={`${montserratAlternates.className} antialised font-bold text-lg bg-gray-200 animate-pulse`}>
                        &nbsp;
                    </h1>
                ) : (
                    <h1 className={`${montserratAlternates.className} antialised font-bold text-lg`}>
                        Stock: {stock}
                    </h1>
                )
            }
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        </>
    )
}
 -->

 ### Optimizing the metadata 
 [https://nextjs.org/docs/app/building-your-application/optimizing/metadata]

(src\app\(shop)\product\[slug]\page.tsx)

<!--  export async function generateMetadata(
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
} -->


and another little trip would be this one :
(src\app\layout.tsx)

<!-- export const metadata: Metadata = {
  title: {
    template: '%s - TESLO | SHOP',
    default: 'Home - TESLO | SHOP',
  },
  description: "Generated by create next app",
}; -->


### trying links to share !!
[https://www.opengraph.xyz/]
if we want to use this we need to open the PORTS tab `ctrl + shift + m` and look for the ports
click on forward port `3000`
we can move the port visibility to public

this is kind of cool because now the people are going to be able to see our application by the public address made by microsoft dev tunnels [https://9rvszldj-3000.euw.devtunnels.ms/]

but we're going to use `NGROK` [https://ngrok.com/]

if it's your first time, create an account, download the ngrok and follow the instructions of the page lol

`PS C:\Users\Omar.Sanchez\next-level-up> ngrok http 3000`

