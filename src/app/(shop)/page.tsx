export const revalidate = 60; //60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
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
}
