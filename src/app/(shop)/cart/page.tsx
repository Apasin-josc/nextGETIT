import { Title } from "@/components";
import Link from "next/link";
/* import { redirect } from "next/navigation"; */
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";


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
                        <ProductsInCart />

                    </div>

                    {/* Checkout - Orden Summary*/}

                    <div className="bg-white rounded-xl shadow-xl p-7 h-[300px]">
                        <h2 className="text-2xl mb-2"> Order Summary</h2>

                        <OrderSummary />

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
}