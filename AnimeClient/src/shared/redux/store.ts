import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../../components/Cart/cartSlice";
//import { counterSlice } from "../../components/contact/counterSlice";
import { productSlice } from "../../components/Shop/productSlice";
import { userSlice } from "../../components/Account/UserSlice";
import { orderSlice } from "../../components/Orders/orderSlice";
import { wishSlice } from "../../components/WishList/WishSlice";

// export function ConfigureStore(){
//     return createStore(counterReducer);
// }

export const store = configureStore({
    reducer: {
        //counter: counterSlice.reducer,
        cart: cartSlice.reducer,
        product: productSlice.reducer,
        user: userSlice.reducer,
        order: orderSlice.reducer,
        wish: wishSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;