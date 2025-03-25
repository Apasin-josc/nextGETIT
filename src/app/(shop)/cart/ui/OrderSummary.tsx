'use client';

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
