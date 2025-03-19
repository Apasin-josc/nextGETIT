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

To achieve this sidebar menu we're going to implment it from zero just using tailwing, because **why not**, is going to hepl us to learn a little more about tailwind 🐘
(src\components\ui\sidebar\Sidebar.tsx)
[export * from "./ui/sidebar/Sidebar";]

and now we can import this rafc component on our layout.tsx (src\app\(shop)\layout.tsx)

<!-- import { Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen">
            <TopMenu />
            <Sidebar />
            <div className="px-0 sm:px-10">
                {children}
            </div>
        </main>
    );
} -->

since the client is using the sidebar menu we need to use the 'use client'

<!-- 'use client';
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {
    return (
        <div>
            {/* Background black */}
            <div
                className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
            >
            </div>

            {/* blur */}
            <div
                className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            >
                {/* side menu */}
                <nav
                    //todo: slide effect
                    className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">

                    <IoCloseOutline
                        size={50}
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={() => console.log(`click`)}
                    />

                    {/* Input for the search */}
                    <div className="relative mt-14">
                        <IoSearchOutline
                            size={20}
                            className="absolute top-2 left-2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>


                    {/* Menu Options */}
                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoPersonOutline
                            size={30} />
                        <span className="ml-3 text-xl">Profile</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoTicketOutline
                            size={30} />
                        <span className="ml-3 text-xl">Orders</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoLogInOutline
                            size={30} />
                        <span className="ml-3 text-xl">Log-In</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoLogOutOutline
                            size={30} />
                        <span className="ml-3 text-xl">Log-Out</span>
                    </Link>

                    {/* line separator */}
                    <div className="w-full h-px bg-gray-200 my-10">

                        <Link
                            href="/"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoShirtOutline
                                size={30} />
                            <span className="ml-3 text-xl">Products</span>
                        </Link>

                        <Link
                            href="/"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoTicketOutline
                                size={30} />
                            <span className="ml-3 text-xl">Orders</span>
                        </Link>

                        <Link
                            href="/"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoPeopleOutline
                                size={30} />
                            <span className="ml-3 text-xl">Users</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
} -->

### **ZUSTAND - UI STORE**

to use ZUSTAND we're going to first install this package with

```
npm i zustand
```

(src\store\ui\ui-store.ts)

<!-- import { create } from "zustand";

interface State {
  isSideMenuOpen: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
})); -->

now we can use our store on our SideBar component (src\components\ui\sidebar\Sidebar.tsx), JUST LIKE if it was another hook

<!-- 'use client';
import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    return (
        <div>
            {/* Background black */}
            {
                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    >
                    </div>
                )
            }


            {/* blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={() => closeMenu()}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    />
                )
            }

            {/* side menu */}
            <nav
                //todo: slide effect
                className={
                    clsx("fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                        {
                            'translate-x-full': !isSideMenuOpen,
                        }
                    )
                }>

                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                {/* Input for the search */}
                <div className="relative mt-14">
                    <IoSearchOutline
                        size={20}
                        className="absolute top-2 left-2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>


                {/* Menu Options */}
                <Link
                    href="/"
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoPersonOutline
                        size={30} />
                    <span className="ml-3 text-xl">Profile</span>
                </Link>

                <Link
                    href="/"
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline
                        size={30} />
                    <span className="ml-3 text-xl">Orders</span>
                </Link>

                <Link
                    href="/"
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogInOutline
                        size={30} />
                    <span className="ml-3 text-xl">Log-In</span>
                </Link>

                <Link
                    href="/"
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogOutOutline
                        size={30} />
                    <span className="ml-3 text-xl">Log-Out</span>
                </Link>

                {/* line separator */}
                <div className="w-full h-px bg-gray-200 my-10">

                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoShirtOutline
                            size={30} />
                        <span className="ml-3 text-xl">Products</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoTicketOutline
                            size={30} />
                        <span className="ml-3 text-xl">Orders</span>
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                    >
                        <IoPeopleOutline
                            size={30} />
                        <span className="ml-3 text-xl">Users</span>
                    </Link>
                </div>
            </nav>
        </div>
    )
} -->

### Displaying just the Type categories on each page (men, women, plebes, unisex)

<!-- import { ProductGrid, Title } from "@/components";
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
} -->

### working on the **product page**

now when we click on a article on [http://localhost:3000/]

for example [http://localhost:3000/product/mens_chill_crew_neck_sweatshirt]

we want to show all the merch details, stock, sizes, add to cart, etc.

<!-- import { montserratAlternates } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ({ params }: Props) {
    const { slug } = await params;
    const product = initialData.products.find(product => product.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

            {/* SlideShow */}
            <div className="col-span-1 md:col-span-2 ">
                <h1>Hola Mundo</h1>

            </div>


            {/* Details */}
            <div className="col-span-1 px-5 ">
                <h1 className={`${montserratAlternates.className} antialised font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5"> ${product.price}</p>

                {/* size selector */}

                {/* quantity selector */}

                {/* button */}
                <button className="btn-primary my-5">Add to Cart</button>

                {/* description */}
                <h3 className="font-bold text-sm"> Description</h3>
                <p className="font-light"> {product.description} </p>
            </div>

        </div>
    );
} -->

also I added the not-found.tsx page under this route (src\app\(shop)\product\not-found.tsx)
just to have personalized errors like "OHHH SLUG NOT FOUND ? well maybe this articles you might like too" you know 🤗

### Size Selector (still inside the product page pal)

for this we need to create a component over [src\components\product\size-selector\SizeSelector.tsx]

and now we're going to be able to import this component under (src\app\(shop)\product\[slug]\page.tsx)

<!-- {/* size selector */}
                <SizeSelector /> -->

now is just matter of editing the sizeselector component:

<!-- import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize: Size;
    availableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4"> Available Sizes </h3>

            <div className="flex">
                {
                    availableSizes.map(size => (
                        <button
                            key={size}
                            className={
                                clsx(
                                    "mx-2 hover:underline text-lg",
                                    {
                                        "underline": size === selectedSize
                                    }
                                )
                            }
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
} -->

remember to also pass the properties that the sizeselector component needs on the product page:
(src\app\(shop)\product\[slug]\page.tsx)

<!-- <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                /> -->

### Quantity Selector

for this we're goign to create the component quantity selector (src\components\product\quantity-selector\QuantitySelector.tsx)
and now we can also import this over the product page (src\app\(shop)\product\[slug]\page.tsx)

since we are using a react hook, we need to use the **use client** from next.js at the top of the file, also remember to give the quantity prop to the imported component at the page.tsx page

<!-- 'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useState } from 'react';

interface Props {
quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {

    const [count, setcount] = useState(quantity);

    const onQuantityChanged = (value: number) => {
        if (count + value < 1) return;
        if (count + value > 5) return 5;
        setcount(count + value);
    }

    return (
        <div className="flex">
            <button onClick={() => onQuantityChanged(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>

            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
                {count}
            </span>


            <button onClick={() => onQuantityChanged(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )

} -->

### **slideshow from images**

```
npm install swiper
```

(src\components\product\slideshow\ProductSlideShow.tsx)

<!-- 'use client';
import { useState } from "react";
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide
                            key={image}
                        >
                            <Image
                                width={1024}
                                height={800}
                                src={`/products/${image}`}
                                alt={title}
                                className="rounded-lg object-fill"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
} -->

now we are goign to add to this swiper the thumbsSwiper!!!, I added a autoplay module also to the first swiper component to swap automatically each 2.5 seconds the image

<!-- 'use client';
import { useState } from "react";
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 2500
                }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide
                            key={image}
                        >
                            <Image
                                width={1024}
                                height={800}
                                src={`/products/${image}`}
                                alt={title}
                                className="rounded-lg object-fill"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map(image => (
                        <SwiperSlide
                            key={image}
                        >
                            <Image
                                width={300}
                                height={300}
                                src={`/products/${image}`}
                                alt={title}
                                className="rounded-lg object-fill"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>


        </div>
    )
} -->

### Slideshow pt3 ft. **MOBILE** 📱

creating a whole new component for mobile devices (src\components\product\slideshow\ProductMobileSlideShow.tsx)

<!-- 'use client';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px'
                }}
                pagination
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide
                            key={image}
                        >
                            <Image
                                width={600}
                                height={500}
                                src={`/products/${image}`}
                                alt={title}
                                className="object-fill"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
} -->

to know which slideshow component to use, we can make the following trick on the page.tsx (src\app\(shop)\product\[slug]\page.tsx)

<!-- {/* SlideShow */}
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
 -->

### **Shopping Cart Page**

(src\app\(shop)\cart\page.tsx)

<!-- import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export default function () {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title='cart' />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Cart */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Add more items</span>
                        <Link href="/" className="underline mb-5">
                            Continue Shopping
                        </Link>


                        {/* Items */}
                        {
                            productsInCart.map(product => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${product.images[0]}`}
                                        alt={product.slug}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                        className="mr-5 rounded"
                                    />

                                    <div>
                                        <p> {product.title}</p>
                                        <p> ${product.price}</p>
                                        <QuantitySelector quantity={3} />

                                        <button className="underline mt-3">
                                            Remove
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Orden Summary*/}

                    <div className="bg-white rounded-xl shadow-xl p-7">
                        <h2 className="text-2xl mb-2"> Order Summary</h2>
                        <div className="grid grid-cols-2">

                            <span>#of Products</span>
                            <span className="text-right">3 articles</span>

                            <span>subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>taxes (15%)</span>
                            <span className="text-right">$ 100</span>

                            <span className="mt-5 text-2xl">total: </span>
                            <span className="mt-5 text-2xl text-right">$ 100</span>


                        </div>

                        <div className="mt-5 mb-2 w-full">
                            <Link href="/checkout/address"
                                className="flex btn-primary justify-center">
                                Checkout
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
} -->

### working with the **address page**

(src\app\(shop)\checkout\address\page.tsx) //not gonna copy paste the code for this page it was a lot of repetitive procedures 🦔

### working with the **checkout verification page**

(src\app\(shop)\checkout\page.tsx)

<!-- import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export default function () {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title='Verify Order' />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Cart */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Modify Items</span>
                        <Link href="/cart" className="underline mb-5">
                            Edit Cart
                        </Link>


                        {/* Items */}
                        {
                            productsInCart.map(product => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${product.images[0]}`}
                                        alt={product.slug}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                        className="mr-5 rounded"
                                    />

                                    <div>
                                        <p> {product.title}</p>
                                        <p> ${product.price} x 3</p>
                                        <p className="font-bold">Subtotal: ${product.price}</p>

                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Orden Summary*/}

                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mb-2 font-bold">Shipping Address </h2>
                        <div className="mb-10">
                            <p className="text-xl"> OmarSCoppola </p>
                            <p> Avenida Padre </p>
                            <p> Colonia Dame de Esa </p>
                            <p> Madrid </p>
                            <p> CP 281023 </p>
                            <p> 123123123 </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


                        <h2 className="text-2xl mb-2"> Order Summary</h2>
                        <div className="grid grid-cols-2">

                            <span>#of Products</span>
                            <span className="text-right">3 articles</span>

                            <span>subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>taxes (15%)</span>
                            <span className="text-right">$ 100</span>

                            <span className="mt-5 text-2xl">total: </span>
                            <span className="mt-5 text-2xl text-right">$ 100</span>


                        </div>

                        <div className="mt-5 mb-2 w-full">

                            <p className="mb-5">
                                {/* disclaimer */}
                                <span className="text-xs">
                                    By placing your order, you agree to our terms and conditions <a href="#" className="underline">Terms and Conditions</a>
                                </span>
                            </p>

                            <Link href="/orders/123"
                                className="flex btn-primary justify-center">
                                Place Order
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
} -->

### **order screen**

once that we finish putting our information, checking our cart, we are going to be redirect into the orders/id page import { Title } from "@/components";
[src\app\(shop)\orders\[id]\page.tsx]

<!-- import { initialData } from "@/seed/seed";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    params: {
        id: string;
    }
}

export default async function ({ params }: Props) {

    const { id } = await params;

    //Todo: verify if this id is from the user
    //redirect(/)
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Order #${id}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Cart */}
                    <div className="flex flex-col mt-5">

                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': false,
                                    'bg-green-700': true,
                                }
                            )
                        }>
                            <IoCardOutline size={30} />
                            {/* <span className="mx-2"> Payment Pending </span> */}
                            <span className="mx-2"> Order Paid </span>

                        </div>


                        {/* Items */}
                        {
                            productsInCart.map(product => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${product.images[0]}`}
                                        alt={product.slug}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                        }}
                                        className="mr-5 rounded"
                                    />

                                    <div>
                                        <p> {product.title}</p>
                                        <p> ${product.price} x 3</p>
                                        <p className="font-bold">Subtotal: ${product.price}</p>

                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Orden Summary*/}

                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mb-2 font-bold">Shipping Address </h2>
                        <div className="mb-10">
                            <p className="text-xl"> OmarSCoppola </p>
                            <p> Avenida Padre </p>
                            <p> Colonia Dame de Esa </p>
                            <p> Madrid </p>
                            <p> CP 281023 </p>
                            <p> 123123123 </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


                        <h2 className="text-2xl mb-2"> Order Summary</h2>
                        <div className="grid grid-cols-2">

                            <span>#of Products</span>
                            <span className="text-right">3 articles</span>

                            <span>subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>taxes (15%)</span>
                            <span className="text-right">$ 100</span>

                            <span className="mt-5 text-2xl">total: </span>
                            <span className="mt-5 text-2xl text-right">$ 100</span>


                        </div>

                        <div className="mt-5 mb-2 w-full">

                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': false,
                                        'bg-green-700': true,
                                    }
                                )
                            }>
                                <IoCardOutline size={30} />
                                {/* <span className="mx-2"> Payment Pending </span> */}
                                <span className="mx-2"> Order Paid </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
} -->

### **Orders Screen Page**

here we are going to be able to see all our orders
(src\app\(shop)\orders\page.tsx)

### **Empty Shopping Cart Screen**

(src\app\(shop)\empty\page.tsx)

<!-- import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function () {
return (
<div className="flex justify-center items-center h-[800px]">
<IoCartOutline size={80} className="mx-5" />
<div className="flex flex-col items-center">
<h1 className="text-xl font-semibold">
Your Shopping Cart is Empty
</h1>

                <Link href={'/'}
                    className="text-blue-500 mt-2 text-4xl">
                    Go Back
                </Link>
            </div>
        </div>
    );

} -->

to link this empty page with the shop cart page.tsx (src\app\(shop)\cart\page.tsx)

<!-- export default function () {

    !!redirect next/navigation!!
    redirect('/empty');

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title='cart' /> -->

### **Footer**

adding a footer (src\components\ui\footer\Footer.tsx)

we can add this footer on the layout of the shop (src\app\(shop)\layout.tsx)

<!-- import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen">
            <TopMenu />
            <Sidebar />
            <div className="px-0 sm:px-10">
                {children}
            </div>
            <Footer />
        </main>
    );
} -->

now is just about going into this and edit this stuff

<!-- import { montserratAlternates } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href="/">
                <span className={`${montserratAlternates.className} antialised font-bold`}> Teslo </span>
                <span> | shop </span>
                <span> © {new Date().getFullYear()} </span>
            </Link>

            <Link
                href='/'
                className="mx-3">
                Privacy Policy
            </Link>

            <Link
                href='/'
                className="mx-3">
                Locations
            </Link>
        </div>
    )
}
 -->

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
2. npm install zustand [https://zustand-demo.pmnd.rs/]
3. npm install clsx // this package helps us to add conditional classes in tailwind
4. npm install swiper //this package helps us to add the slideshow of images on the project! like the 🎠🎪💫 [https://swiperjs.com/react] --> for this project using the thumbs gallery demo [https://swiperjs.com/demos]
