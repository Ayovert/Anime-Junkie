import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import agent from "../../shared/api/agent"
import { Order } from "../../shared/model/order"
import { RootState } from "../../shared/redux/store"

interface OrderState {
    orders : Order[],
    status: string
}



const ordersAdapter = createEntityAdapter<Order>();

export const getOrdersAsync = createAsyncThunk<Order[]>(
    'orders/getOrdersAsync',
   async (_, thunkAPI) => {
       try{
           
           const orders = await  agent.Orders.list();
           
           return orders;
       }catch(error :any){
           console.log(error);
           return thunkAPI.rejectWithValue({error: error.data});

       }
   }
)

export const getOrderAsync = createAsyncThunk<Order, number>(
    'orders/getOrderAsync',
    async(orderId, thunkAPI) => {
        try{
            return await agent.Orders.get(orderId);
        }catch(error :any){
            return thunkAPI.rejectWithValue({error: error.data} );
            
        }
    }

)

const initialState : OrderState = {
    orders : [],
    status: 'idle'
}

export const orderSlice = createSlice({
    name: 'orders',
    initialState : ordersAdapter.getInitialState<OrderState>(
        initialState
    ),
    reducers:{},
    extraReducers: ((builder) => {
        builder.addCase(getOrdersAsync.pending, (state) =>{
            state.status = 'pending';
        });

        builder.addCase(getOrdersAsync.fulfilled, (state, action) =>{
            state.orders = action.payload;
            state.status = 'idle';

            if(action.payload.length > 0 )
            {
                ordersAdapter.setAll(state, action.payload);
                //state.product = action.payload;
                state.status = 'idle';
                
            }
        });
        builder.addCase(getOrdersAsync.rejected, (state, action) =>{
            state.status = 'idle';
        });

        builder.addCase(getOrderAsync.pending, (state) => {
            state.status = 'fetchingOrder';
        });

        builder.addCase(getOrderAsync.fulfilled, (state, action) => {
            ordersAdapter.upsertOne(state, action.payload);
            state.status ='idle';
        });
        builder.addCase(getOrderAsync.rejected, (state, action) => {
            state.status = 'idle';
        });
    })
})

export const  ordersSelectors = ordersAdapter.getSelectors((state:RootState) => state.order);