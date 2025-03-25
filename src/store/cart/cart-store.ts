import type { CartProduct } from "@/interfaces"
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
                };
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
)