### 🛒

### Client Side - Sizes & Quantities

client side rendering


<!--            TODO all this code  can be candidate of being used b the client           

                {/* size selector */}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/* quantity selector */}
                <QuantitySelector
                    quantity={2} />

                {/* button */}
                <button className="btn-primary my-5">Add to Cart</button> -->

for that we're going to create this new folder with this component

(src\app\(shop)\product\[slug]\ui\AddToCart.tsx)

<!-- 'use client';
import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);

    const addToCart = () => {
        if (!size) return;
        console.log({ size, quantity })
    }


    return (
        <>
            {/* size selector */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={(size) => setSize(size)}
            />

            {/* quantity selector */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity} />

            {/* button */}
            <button
                onClick={addToCart}
                className="btn-primary my-5">Add to Cart</button>
        </>
    )
} -->

as you can see we modified the SizeSelector component and the QuantitySelector component too

<!-- 'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

    /* const [count, setcount] = useState(quantity); */

    const onValueChanged = (value: number) => {
        if (quantity + value < 1) return;
        if (quantity + value > 5) return 5;
        /* setcount(count + value); */
        onQuantityChanged(quantity + value);
    }

    return (
        <div className="flex">
            <button onClick={() => onValueChanged(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>

            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
                {quantity}
            </span>


            <button onClick={() => onValueChanged(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
} -->

<!-- import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4"> Available Sizes </h3>

            <div className="flex">
                {
                    availableSizes.map(size => (
                        <button
                            key={size}
                            onClick={() => onSizeChanged(size)}
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

### Error Message if there's no size selected

<!-- 'use client';
import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const [posted, setPosted] = useState(false);
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        console.log({ size, quantity })
    }


    return (
        <>
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {
                posted && !size && (
                    <span className="mt-2 text-red-500 fade-in">
                        You need to select a size!
                    </span>
                )}
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            {/* size selector */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={(size) => setSize(size)}
            />

            {/* quantity selector */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity} />

            {/* button */}
            <button
                onClick={addToCart}
                className="btn-primary my-5">Add to Cart</button>
        </>
    )
}
 -->

### Client Side - Cart Store 

we could store our items on:
1. cookies  - ssr
2. session storage - if we close the browser all the info is going to be removed
3. local storage - we're going to use this meanwhile


(src\store\cart\cart-store.ts) ZUSTAND

<!-- import type { CartProduct } from "@/interfaces"
import { create } from "zustand";


interface State{
    //products in cart
    cart: CartProduct[];

    TODO:
    1//addProductToCart
    2//updateProductQuantity
    3//removeProduct
}

export const useCartStore = create<State>()( 
    (set) => ({


    cart: [],


})) -->

### store - addProductToCart

(src\store\cart\cart-store.ts)

<!-- import type { CartProduct } from "@/interfaces"
import { create } from "zustand";


interface State{
    //products in cart
    cart: CartProduct[];

    addProductToCart: (product: CartProduct) => void;
    //updateProductQuantity
    //removeProduct
}

export const useCartStore = create<State>()( 
    (set, get) => ({


    cart: [],

    //Methods

    addProductToCart: (product: CartProduct) => {
        const {cart} = get();

        //1. check if the product exists on the cart with the selected size
        const productInCart = cart.some(
            (item) => (item.id === product.id && item.size === product.size)
        );

        if(!productInCart){
            set({cart: [...cart, product]})
            return;
        }

        //2. we know that the product exist by size, we need to increment
        const updatedCartProducts = cart.map( (item) => {
            
            if(item.id === product.id && item.size === product.size){
                return {...item, quantity: item.quantity + product.quantity}
            }

            return item;
        });
        set({cart: updatedCartProducts})

    }


})) -->

### adding the product to the shopping cart 🛒
(src\app\(shop)\product\[slug]\ui\AddToCart.tsx)

i'm goign to import the function that i created before in zustand, we need to call the addProductToCart by useCartStore

<!-- 'use client';
import { QuantitySelector, SizeSelector } from "@/components"
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        /* console.log({ size, quantity }) */

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0],
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }


    return (
        <>

            {
                posted && !size && (
                    <span className="mt-2 text-red-500 fade-in">
                        You need to select a size!
                    </span>
                )}

            {/* size selector */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={(size) => setSize(size)}
            />

            {/* quantity selector */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity} />

            {/* button */}
            <button
                onClick={addToCart}
                className="btn-primary my-5">Add to Cart</button>
        </>
    )
} -->

### Making **Persistent** the shopping Cart 

<!-- import type { CartProduct } from "@/interfaces"
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State{
    //products in cart
    cart: CartProduct[];

    addProductToCart: (product: CartProduct) => void;
    //updateProductQuantity
    //removeProduct
}

export const useCartStore = create<State>()( 


    //next is going to try to create all the page, but with the persist
    //it will try to get the data from the local storage
    //if it doesn't exist, it will create the store with the initial state
    !!!!!!!!
    persist(
    !!!!!!!!
        (set, get) => ({
            cart: [],
            //Methods
            addProductToCart: (product: CartProduct) => {
                const {cart} = get();
        
                //1. check if the product exists on the cart with the selected size
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );
        
                if(!productInCart){
                    set({cart: [...cart, product]})
                    return;
                }
        
                //2. we know that the product exist by size, we need to increment
                const updatedCartProducts = cart.map( (item) => {
                    
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: item.quantity + product.quantity}
                    }
        
                    return item;
                });
                set({cart: updatedCartProducts})
        
            }
        })
        ,{
            name: 'shopping-cart',
        }
    )
) -->


### showing number of elements in the shopping cart

(src\store\cart\cart-store.ts)


<!-- interface State{
    //products in cart
    cart: CartProduct[];

    !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    getTotalItems: () => number;
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!

    addProductToCart: (product: CartProduct) => void;
    //updateProductQuantity
    //removeProduct
}

export const useCartStore = create<State>()( 


    //next is going to try to create all the page, but with the persist
    //it will try to get the data from the local storage
    //if it doesn't exist, it will create the store with the initial state
    persist(
        (set, get) => ({
            cart: [],
            //Methods
            getTotalItems: () => {
                const {cart} = get();
                //reduce the cart to get the total quantity of items
                !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                return cart.reduce((total, item ) => total + item.quantity, 0);
                !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }, -->


so now we need to import our function on (src\components\ui\top-menu\TopMenu.tsx)

<!-- 'use client';
import { montserratAlternates } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //to handle the problems with the hydration
    ???????????????????????????????????????????
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);
    ???????????????????????????????????????????

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
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/gender/men">
                    Hombres
                </Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/gender/women">
                    Mujeres
                </Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href="/gender/kid">
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
                    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        {
                            (loaded && totalItemsInCart > 0) && (
                                <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                    {totalItemsInCart}
                                </span>
                            )
                        }
                    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>

                <button
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    onClick={openSideMenu}
                > MENU
                </button>
            </div>

        </nav >
    )
} -->

### showing the elemnts on the shopping cart

we are going to modify the (src\app\(shop)\cart\page.tsx)

<!-- import { Title } from "@/components";
import Link from "next/link";
/* import { redirect } from "next/navigation"; */
import { ProductsInCart } from "./ui/ProductsInCart";


export default function () {

    /* redirect('/empty'); */

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
                        !!!!!!!!!!!!!!!!!!
                        <ProductsInCart />
                        !!!!!!!!!!!!!!!!!!

                    </div>

                    {/* Checkout - Orden Summary*/}

                    <div className="bg-white rounded-xl shadow-xl p-7 h-[300px]">
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

creating a new component to show this from the clients 

(src\app\(shop)\cart\ui\ProductsInCart.tsx)

<!-- 'use client';

import Image from 'next/image';
import { useCartStore } from "@/store";
import { QuantitySelector } from '@/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
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
                            <Link
                                className='hover:underline cursor-pointer'
                                href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p> ${product.price}</p>
                            <QuantitySelector
                                quantity={3}
                                onQuantityChanged={value => console.log(value)} />
                            <button className="underline mt-3">
                                Remove
                            </button>
                        </div>

                    </div>
                ))
            }
        </>
    )
} -->

### changing quantity from the sopping cart 
(src\store\cart\cart-store.ts)

<!-- import type { CartProduct } from "@/interfaces"
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State{
    //products in cart
    cart: CartProduct[];


    getTotalItems: () => number;

    addProductToCart: (product: CartProduct) => void;
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //removeProduct
}

export const useCartStore = create<State>()( 


    //next is going to try to create all the page, but with the persist
    //it will try to get the data from the local storage
    //if it doesn't exist, it will create the store with the initial state
    persist(
        (set, get) => ({
            cart: [],
            //Methods
            getTotalItems: () => {
                const {cart} = get();
                //reduce the cart to get the total quantity of items
                return cart.reduce((total, item ) => total + item.quantity, 0);
            },


            addProductToCart: (product: CartProduct) => {
                const {cart} = get();
        
                //1. check if the product exists on the cart with the selected size
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );
        
                if(!productInCart){
                    set({cart: [...cart, product]})
                    return;
                }
        
                //2. we know that the product exist by size, we need to increment
                const updatedCartProducts = cart.map( (item) => {
                    
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: item.quantity + product.quantity}
                    }
        
                    return item;
                });
                set({cart: updatedCartProducts})
        
            },
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get ();
                const updatedCartProducts = cart.map(item => {
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: quantity};
                    };
                    return item
                });
                set({cart: updatedCartProducts});
            }
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        })
        ,{
            name: 'shopping-cart',
        }
    )
) -->

now with this function setted up, we can use the zustand store on our products in cart like this: (src\app\(shop)\cart\ui\ProductsInCart.tsx)
(src\app\(shop)\cart\ui\ProductsInCart.tsx)
<!-- 'use client';

import Image from 'next/image';
import { useCartStore } from "@/store";
import { QuantitySelector } from '@/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export const ProductsInCart = () => {
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
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
                            <Link
                                className='hover:underline cursor-pointer'
                                href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p> ${product.price}</p>
                            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)} />
                            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            <button className="underline mt-3">
                                Remove
                            </button>
                        </div>

                    </div>
                ))
            }
        </>
    )
}
 -->


 ### removing items from the sopping cart 
(src\store\cart\cart-store.ts)

<!-- import type { CartProduct } from "@/interfaces"
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State{
    //products in cart
    cart: CartProduct[];


    getTotalItems: () => number;

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()( 


    //next is going to try to create all the page, but with the persist
    //it will try to get the data from the local storage
    //if it doesn't exist, it will create the store with the initial state
    persist(
        (set, get) => ({
            cart: [],
            //Methods
            getTotalItems: () => {
                const {cart} = get();
                //reduce the cart to get the total quantity of items
                return cart.reduce((total, item ) => total + item.quantity, 0);
            },


            addProductToCart: (product: CartProduct) => {
                const {cart} = get();
        
                //1. check if the product exists on the cart with the selected size
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );
        
                if(!productInCart){
                    set({cart: [...cart, product]})
                    return;
                }
        
                //2. we know that the product exist by size, we need to increment
                const updatedCartProducts = cart.map( (item) => {
                    
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: item.quantity + product.quantity}
                    }
        
                    return item;
                });
                set({cart: updatedCartProducts})
        
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get ();
                const updatedCartProducts = cart.map(item => {
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: quantity};
                    };
                    return item
                });
                set({cart: updatedCartProducts});
            },
            removeProduct: (product: CartProduct) => {
                const {cart} = get();
                const updatedCartProducts = cart.filter(
                    item => item.id !== product.id || item.size !== product.size
                );
                set({cart: updatedCartProducts});
            },
        })
        ,{
            name: 'shopping-cart',
        }
    )
) -->

(src\app\(shop)\cart\ui\ProductsInCart.tsx)

<!-- 'use client';

import Image from 'next/image';
import { useCartStore } from "@/store";
import { QuantitySelector } from '@/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
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
                            <Link
                                className='hover:underline cursor-pointer'
                                href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p> ${product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)} />
                            <button
                                onClick={() => removeProduct(product)}
                                className="underline mt-3">
                                Remove
                            </button>
                        </div>

                    </div>
                ))
            }
        </>
    )
} -->

### summary order !!!!!!!!!!!!!!!!! 💡💡🛒💡🛒


(src\store\cart\cart-store.ts)

<!-- import type { CartProduct } from "@/interfaces"
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State{
    //products in cart
    cart: CartProduct[];


    getTotalItems: () => number;
   /*getSummaryInformation: () => void; */
    getSummaryInformation: () => {
     subTotal: number;
     tax: number;
     total: number;
     itemsInCart: number;
     };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()( 


    //next is going to try to create all the page, but with the persist
    //it will try to get the data from the local storage
    //if it doesn't exist, it will create the store with the initial state
    persist(
        (set, get) => ({
            cart: [],
            //Methods
            getTotalItems: () => {
                const {cart} = get();
                //reduce the cart to get the total quantity of items
                return cart.reduce((total, item ) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const {cart} = get();
                const subTotal = cart.reduce(
                    (subTotal, product) => (product.quantity * product.price) + subTotal, 0 
                );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item ) => total + item.quantity, 0);

                return{
                    subTotal, tax, total, itemsInCart
                }

            },

            addProductToCart: (product: CartProduct) => {
                const {cart} = get();
        
                //1. check if the product exists on the cart with the selected size
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );
        
                if(!productInCart){
                    set({cart: [...cart, product]})
                    return;
                }
        
                //2. we know that the product exist by size, we need to increment
                const updatedCartProducts = cart.map( (item) => {
                    
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: item.quantity + product.quantity}
                    }
        
                    return item;
                });
                set({cart: updatedCartProducts})
        
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get ();
                const updatedCartProducts = cart.map(item => {
                    if(item.id === product.id && item.size === product.size){
                        return {...item, quantity: quantity};
                    };
                    return item
                });
                set({cart: updatedCartProducts});
            },
            removeProduct: (product: CartProduct) => {
                const {cart} = get();
                const updatedCartProducts = cart.filter(
                    item => item.id !== product.id || item.size !== product.size
                );
                set({cart: updatedCartProducts});
            },
        })
        ,{
            name: 'shopping-cart',
        }
    )
) -->

NOW we can use this function to display the information on our cart page.tsx
(src\app\(shop)\cart\page.tsx)


for this we're goign to move all the order summary code to a new component to 'use client' (src\app\(shop)\cart\ui\OrderSummary.tsx)

<!-- 'use client';

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const OrderSummary = () => {


    const [loaded, setLoaded] = useState(false);

    const summaryInformation = useCartStore(state => state.getSummaryInformation);
    const { subTotal, tax, total, itemsInCart } = summaryInformation();

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) return <p> Loading... </p>

    return (
        <div className="grid grid-cols-2">

            <span>#of Products</span>
            <span className="text-right">{itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}</span>

            <span>subtotal</span>
            <span className="text-right">{subTotal}</span>

            <span>taxes (15%)</span>
            <span className="text-right">{tax}</span>

            <span className="mt-5 text-2xl">total: </span>
            <span className="mt-5 text-2xl text-right">{total}</span>


        </div>
    )
}
 -->

 dont forget to import this component on the page.tsx (src\app\(shop)\cart\page.tsx)



### Currency Format

(src\utils\currencyFormat.ts)

<!-- export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
} -->

(src\app\(shop)\cart\ui\OrderSummary.tsx)
<!-- 'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {


    const [loaded, setLoaded] = useState(false);

    const summaryInformation = useCartStore(state => state.getSummaryInformation);
    const { subTotal, tax, total, itemsInCart } = summaryInformation();

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) return <p> Loading... </p>

    return (
        <div className="grid grid-cols-2">

            <span>#of Products</span>
            <span className="text-right">{itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}</span>

            <span>subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>taxes (15%)</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">total: </span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>


        </div>
    )
}
 -->

 ### Empty Shopping Cart

(src\components\ui\top-menu\TopMenu.tsx)


<!--                  <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>

                !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                <Link href={
                    ((totalItemsInCart === 0) && loaded)
                        ? '/empty'
                        : '/cart'
                !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                } className="mx-2">
                    <div className="relative">
                        {
                            (loaded && totalItemsInCart > 0) && (
                                <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                    {totalItemsInCart}
                                </span>
                            )
                        }
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link> -->