'use client';
import { montserratAlternates } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"

export const TopMenu = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());

    //to handle the problems with the hydration
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

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

                <Link href={
                    ((totalItemsInCart === 0) && loaded)
                        ? '/empty'
                        : '/cart'
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
                </Link>

                <button
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    onClick={openSideMenu}
                > MENU
                </button>
            </div>

        </nav >
    )
}
