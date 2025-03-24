import type { CartProduct } from "@/interfaces"
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State{
    //products in cart
    cart: CartProduct[];


    getTotalItems: () => number;

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
        
            }
        })
        ,{
            name: 'shopping-cart',
        }
    )
)