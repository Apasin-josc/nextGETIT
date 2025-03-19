# **NEXT.JS 15.2.3 GUIDE**

### **NEXT JS Fonts**

src\config\fonts.ts
to change the fonts from next.js I'm going to create a new folder [config] and a new file named **fonts.ts**

src\config\fonts.ts

<!-- import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

export const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
}); -->

now we can import this file in the layout.tsx (src\app\layout.tsx) || if we want to add a new font to the project we can just go again into our (src\config\fonts.ts)

<!-- export const montserratAlternates = Montserrat_Alternates({
variable: "--font-montserrat-alternates",
subsets: ["latin"],
weight: ["500", "700"],
}); -->

and use it on a new page.tsx file like this:

<!-- import { montserratAlternates } from "@/config/fonts";

export default function Home() {
return (

<div className="App">
<h1> Hola Mundo</h1>
<h1 className={montserratAlternates.className}>Hola Mundo</h1>
</div>
);
} -->

### **Directory structure and first pages**

📂 src
├── 📂 app
│ ├── 📂 (shop)
│ ├── 📂 auth
│ ├── 🌟 favicon.ico
│ ├── 🎨 globals.css
│ ├── 🏗️ layout.tsx
│
├── 📂 components
│ ├── 🛒 cart
│ ├── 📦 product
│ ├── 📦 products
│ ├── 🎨 ui
│ │ ├── 📄 index.ts
│
├── ⚙️ config
├── 📂 interfaces
├── 🌱 seed
│ ├── 📄 seed.ts
│
└── 🏪 store

### **adding a TopMenu**

1. first we're goign to create the component under (src\components\ui\top-menu\TopMenu.tsx)

<!-- import { montserratAlternates } from "@/config/fonts"
import Link from "next/link"

export const TopMenu = () => {
    return (
        <nav className='flex px-5 justify-between items-center w-full'>
            <div>
                <Link href="/">
                    <span className={`${montserratAlternates.className} antialiased font-bold`}> Teslo </span>
                </Link>
            </div>
        </nav>
    )
}
 -->

⚠️⚠️since I created the first component I'm going to add it into the barrel file (index.ts) file to export it from my components folder⚠️⚠️

2.  now we can use our TopMenu component inside the shoplayout like this:

 <!-- import { TopMenu } from "@/components";

export default function ShopLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen">
            <TopMenu />
            {children}
        </main>
    );
} -->

3. and well, the rest is just about still editing our component 🫵

<!-- import { montserratAlternates } from "@/config/fonts"
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
    return (
        <nav className='flex px-5 justify-between items-center w-full'>
            {/* logo */}
            <div>
                <Link href="/">
                    <span className={`${montserratAlternates.className} antialiased font-bold`}> Teslo </span>
                    <span> | Shop</span>
                </Link>
            </div>

            {/* center menu */}
            <div className='hidden sm:block'>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/men">
                    Hombres
                </Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/women">
                    Mujeres
                </Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/category/kids">
                    Plebes
                </Link>
            </div>

            {/* search, cart, menu */}
            <div className="flex items-center">

                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>

                <Link href="/cart" className="mx-2">
                    <div className="relative">
                        <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">3</span>
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>

                <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"> MENU </button>
            </div>

        </nav >
    )
} -->

### **404 personal pages**

for that we can achieve it by creating a not-found.tsx file
(src\app\(shop)\category\not-found.tsx)

this is a error component predetermined by next, inside this component over the properties of the function we are going to have available specific functions from next to handle this 404 requests 🦁

<!-- export default function (❌.properties by next) {
    return (
        <div>
            <h1>Hello Page</h1>
        </div>
    );
} -->

so inde of our (src\app\(shop)\category\[id]\page.tsx) we can have this code:

<!-- import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string;
    }
}

export default async function ({ params }: Props) {
    const { id } = await params;
    if (id === 'kids') {
        notFound();
    }
    return (
        <div>
            <h1>Category Page {id}</h1>
        </div>
    );
} -->

### **customizing the notfound page**

(src\components\ui\not-found\PageNotFound.tsx)

<!-- export const PageNotFound = () => {
    return (
        <div>PageNotFound</div>
    )
} -->

(src\components\index.ts)

<!-- export * from './ui/not-found/PageNotFound' -->

now we can return this component on our (src\app\(shop)\category\not-found.tsx)

<!-- import { PageNotFound } from "@/components";

export default function () {
    return (
        <div>
            <PageNotFound />
        </div>
    );
} -->

so now we can just customize our PageNotFound component 🕑

<!-- import { montserratAlternates } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"

export const PageNotFound = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
            <div className="text-center px-5 mx-5">
                <h2 className={`${montserratAlternates.className} antialiased text-9xl`}>404</h2>
                <p className="font-semibold text-xl"> Whoops!!!! </p>
                <p className="font-light">
                    <span> Go Back </span>
                    <Link href='/' className="font-normal hover:underline transition-all">
                        Home
                    </Link>
                </p>
            </div>

            <div className="px-5 mx-5">
                <Image
                    src="/imgs/starman_750x750.png"
                    alt="Starman"
                    className="p-5 sm:p-0"
                    width={550}
                    height={550} />
            </div>
        </div>
    )
} -->

### **Component Title**

for the home page we're going to add a title, that's going to show the category where we are (src\components\ui\title\Title.tsx)
index.ts

<!-- export * from "./ui/title/Title"; -->

with this now we can import our Title on the main page (src\app\(shop)\page.tsx)

<!-- import { Title } from "@/components";

export default function Home() {
  return (
    <>
      <Title />
    </>
  );
} -->

now everything is just matter of editing our component

<!-- import { montserratAlternates } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
    return (
        <div className={`mt-3 ${className}`}>
            <h1 className={` ${montserratAlternates.className} antialiased text-4xl font-semibold my-10`}>{title}</h1>
            {
                subtitle && (
                    <h3 className="text-xl mb-5">{subtitle}</h3>
                )
            }
        </div>
    )
}
 -->

👁👁 now that we added this new props that our component expects to recieve we're going to need to go back to our main page.tsx and add this:

<!-- import { Title } from "@/components";

export default function Home() {
return (
<>
<Title
        title="Shop"
        subtitle="All the products"
        className="mb-2" />
</>
);
} -->

### **Products Grid**

we can have a products grid by creating a new component over (src\components\products\product-grid\ProductGrid.tsx)

<!-- import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
    products: Product[];
}
export const ProductGrid = ({ products }: Props) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
            {
                products.map(product => (
                    <ProductGridItem key={product.slug}
                        product={product}
                    />
                ))
            }

        </div>
    )
} -->

the Props interface is declared on (src\interfaces\product.interface.ts)

<!-- export interface Product {
  //todo: id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "men" | "women" | "kid" | "unisex";
}

export type ValidSizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidTypes = "shirts" | "pants" | "hoodies" | "hats"; -->

and as you can see we have another component called ProductGridItem this is communicating with our ProductGrid component

<!-- import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
    product: Product;
}
export const ProductGridItem = ({ product }: Props) => {
    return (
        <div className="rounded-md overflow-hidden fade-in">
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    className="w-full object-cover"
                    width={500}
                    height={500}
                />
            </Link>

            <div className="p-4 flex flex-col">
                <Link href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
                <span className="font-bold">${product.price}</span>

            </div>
        </div>
    )
} -->

we can import our productgrid component on our shop page.tsx(src\app\(shop)\page.tsx)

<!-- import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
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

### Changing the **IMAGE** with a mouseover effect

we can achieve this by adding a state, OJITO, since you are waiting for the client === **'use client'**

<!-- 'use client';

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
    product: Product;
}
export const ProductGridItem = ({ product }: Props) => {
    !using the useState hook
    const [displayImage, setDisplayImage] = useState(product.images[0]);
    return (
        <div className="rounded-md overflow-hidden fade-in">
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover rounded"
                    width={500}
                    height={500}
                    !applying the useState hook to display the second image on the mouseEnter event
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </Link>

            <div className="p-4 flex flex-col">
                <Link
                    className="hover:text-blue-500"
                    href={`/product/${product.slug}`}>
                    {product.title}
                </Link>
                <span className="font-bold">${product.price}</span>

            </div>
        </div>
    )
} -->

### **Lateral SideBar Menu**

# **SNIPPETS IN NEXTJS**

1. to create a layout root component

```
lrc
```

<!-- export default function ShopLayout({
children
}: {
children: React.ReactNode;
}) {
return (

<div>
<h1>Hello Root Layout Shop</h1>
</div>
);
} -->

2. to create a page component

```
pcr
```

<!-- export default function CartPage() {
    return (
        <div>
            <h1>Category Page</h1>
        </div>
    );
} -->

3. to create a react arrow function component

```
rafc
```

<!-- import React from 'react'

export const TopMenu = () => {
    return (
        <nav className=''>TopMenu</nav>
    )
} -->

# **libraries used**

1. npm install react-icons --save
