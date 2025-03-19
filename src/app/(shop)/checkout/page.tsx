import { Title } from "@/components";
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
}