import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import agent from "../../shared/api/agent"
import { Cart } from "../../shared/model/cart"

import { getCookie } from "../../shared/util/util"

interface CartState {
    cart : Cart | null,
    status: string
}

const initialState : CartState = {
    cart : null,
    status: 'idle'
}


export const getCartAsync = createAsyncThunk<Cart>(
    'cart/getCartAsync',
   async (_, thunkAPI) => {
       try{
           
           const cart = await agent.Cart.get();
           if (cart) {
            thunkAPI.dispatch(setCart(cart));
          }
           return cart;
       }catch(error :any){
           console.log(error);
           return thunkAPI.rejectWithValue({error: error.data});

       }
   },
   {
       condition : () => {
           if(!getCookie('buyerId'))
           {
              
                return false;

               
           }
       }
   }
)

export const addCartItemAsync = createAsyncThunk<Cart, {productId : number, quantity? : number}>(
    'cart/addCartItemAsync',

    async({productId, quantity=1 }, thunkAPI) => {
        try{

            return await agent.Cart.addToCart(productId, quantity);
        }catch(error : any){
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data} )
        }
    }
)


export const removeCartItemAsync = createAsyncThunk<void, {productId : number, quantity : number, name?: string}>(
    'cart/removeCartItemAsync',

    async({productId, quantity = 1}, thunkAPI) => {
        try{
           

            await agent.Cart.removeFromCart(productId, quantity);
        }catch(error: any){
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data} )
        }
    }
)


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state: { cart: any } , action: { payload: any }) =>{
            state.cart = action.payload
        },
        clearCart:(state: any) =>{
            state.cart = null;
        }
    },
    extraReducers:(builder => {
        builder.addCase(addCartItemAsync.pending,(state, action) => {

            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        builder.addCase(addCartItemAsync.fulfilled,(state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
            toast.success("Added product to cart");
        });
        builder.addCase(addCartItemAsync.rejected,(state) => {
            state.status = 'idle';
        });

        builder.addCase(removeCartItemAsync.pending, (state, action) =>{
          //const item =   state.cart?.items.find(i => i.productId === action.meta.arg.productId )

            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        } );
        builder.addCase(removeCartItemAsync.fulfilled, (state, action) =>{
            const {productId, quantity} = action.meta.arg;

            const itemIndex = state.cart?.items.findIndex( i => i.productId === productId);


            if(itemIndex === -1 || itemIndex ===undefined) return;

            
                state.cart!.items[itemIndex].quantity -= quantity;
    
                if (state.cart!.items[itemIndex].quantity === 0){
                    state.cart!.items.splice(itemIndex, 1);
                }
            
            state.status = 'idle';
        });

        builder.addCase(removeCartItemAsync.rejected, (state, action) => {
            state.status = 'idle';
        });

      /*  builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
            toast.success("Added product to cart");
        });

        builder.addCase(getCartAsync.fulfilled, (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
            
        });*/

       builder.addMatcher(isAnyOf(addCartItemAsync.fulfilled ,getCartAsync.fulfilled), (state, action) => {
            state.cart = action.payload;
            state.status = 'idle';
        });
       
        builder.addMatcher(isAnyOf(addCartItemAsync.rejected , getCartAsync.rejected),(state) => {
            toast.error('could not load cart');
            state.status = 'idle';
        });
    })
})


export const {setCart, clearCart} = cartSlice.actions;

// 