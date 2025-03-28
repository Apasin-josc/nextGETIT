import { Title } from "@/components";
import { initialData } from "@/seed/seed";
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
}