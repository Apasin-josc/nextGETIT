### Loading the **products form the DB**

first we're goign to need to move to our main page.tsx
(src\app\(shop)\page.tsx)

here's where we're loading the products right now

<!-- import { initialData } from "@/seed/seed";

const products = initialData.products; -->

now i'm going to create a folder called actions inside (src\actions\product\product-pagination.ts)

<!-- "use server";

import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
    console.log(products);
  } catch (error) {}
}; -->

and import it on our main page
(src\app\(shop)\page.tsx)

<!-- import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default async function Home() {

  const productsTemp = await getPaginatedProductsWithImages();
  console.log(productsTemp);
  return (
    <>
      <Title
        title="Shop"
        subtitle="All the products"
        className="mb-2" />

      <ProductGrid
        products={products}
      />
    </>
  );
} -->

### showing the products on the screen

since we are expecting the array of images and right now with the tbales we have it in another way I changed this: "use server";

<!-- import prisma from "@/lib/prisma";

export const getPaginatedProductsWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
    console.log(products);
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return {
      currentPage: 1,
      totalPages: 10,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  } catch (error) {
    throw new Error(`can't load products ${error}`);
  }
}; -->

and now we're displaying the items from the database instead from the hard coded seed file

<!-- import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";

export default async function Home() {

  const { products } = await getPaginatedProductsWithImages();
  console.log(products);
  return (
    <>
      <Title
        title="Shop"
        subtitle="All the products"
        className="mb-2" />

      <ProductGrid
        products={products}
      />
    </>
  );
} -->

### manual pagination [https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function]

<!-- import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";

!!!!!!!!!!!!!!!!!!!!!!!!!!
interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}
!!!!!!!!!!!!!!!!!!!!!!!!!

export default async function Home({ searchParams }: Props) {

    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const resolvedParams = await searchParams;
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const currentPage = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
  console.log(currentPage);

  const { products } = await getPaginatedProductsWithImages({});
  return (
    <>
      <Title
        title="Shop"
        subtitle="All the products"
        className="mb-2" />

      <ProductGrid
        products={products}
      />
    </>
  );
} -->

### controlling when there's no products on the page

(src\app\(shop)\page.tsx)

 <!--  //! when we don't have any products -> go to home page
  if (products.length === 0) {
    redirect('/')
  } -->

### pagination determine the total of pages

imagine that we have 40 articles and we are displaying 10 articles per page, aka we need 4 pages
BUT, if we have 41 articles we would need 5 pages, BUT if we divide 41/10, we're going to get 4.1

`Math.ceil(41/10) = 5` javascript function 💡

(src\actions\product\product-pagination.ts)

<!-- "use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  try {
    //1. obtaining the producs
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 3,
          select: {
            url: true,
          },
        },
      },
    });

    //2. knowing the total number of pages
    //todo:
    const totalCount = await prisma.product.count({});
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error(`can't load products ${error}`);
  }
}; -->

and in our page.tsx(src\app\(shop)\page.tsx)

<!-- import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
searchParams: Promise<{
page?: string;
}>;
}

export default async function Home({ searchParams }: Props) {

const resolvedParams = await searchParams;
const currentPageManual = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
console.log(currentPageManual);

const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({});

console.log({ currentPage, totalPages });

//! when we don't have any products -> go to home page
if (products.length === 0) {
redirect('/')
}

return (
<>
<Title
        title="Shop"
        subtitle="All the products"
        className="mb-2" />

      <ProductGrid
        products={products}
      />
    </>

);
} -->

### Pagination **HTML Component**

(src\components\ui\pagination\Pagination.tsx)[https://www.creative-tim.com/twcomponents/component/pagination-3]

<!-- import Link from "next/link";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
    return (
        <div className="flex text-center justify-center mt-10 mb-32">

            <nav aria-label="Page navigation example">

                <ul className="flex list-style-none">
                    <li className="page-item ">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href="#"><IoChevronBackOutline size={30} /></Link></li>

                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href="#">1</Link></li>

                    <li className="page-item active">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                            href="#">2 <span className="visually-hidden"></span></Link></li>

                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href="#">3</Link></li>

                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href="#"><IoChevronForwardOutline size={30} /></Link></li>
                </ul>
            </nav>
        </div>
    )
} -->

now on the (src\app\(shop)\page.tsx)

<!-- import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {

  const resolvedParams = await searchParams;
  const currentPageManual = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
  console.log(currentPageManual);

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({});

  console.log({ currentPage, totalPages });

  //! when we don't have any products -> go to home page
  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title
        title="Shop"
        subtitle="All the products"
        className="mb-2" />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />

    </>
  );
} -->
