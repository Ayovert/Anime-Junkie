import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../shared/api/agent";
import { WishList } from "../../shared/model/wishlist";


interface WishState {
  wishlist: WishList | null;
  status: string;
}

const initialState: WishState = {
  wishlist: null,
  status: "idle",
};

export const getWishListAsync = createAsyncThunk<WishList>(
  "wish/getWishListAsync",
  async (_, thunkAPI) => {
    try {

      const wishlist = await agent.WishList.get();

      return wishlist;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const addWishItemAsync = createAsyncThunk<
  WishList,
  { productId: number}
>(
  "wish/addWishItemAsync",

  async ({ productId}, thunkAPI) => {
    try {
      return await agent.WishList.addToWishlist(productId);
    } catch (error: any) {

      console.log(error);

      if(error.status === 401){
        toast.error("You must be logged in!");
      }
     // navigate('/login',{ state:{ from: '/shop' }, replace:true});
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const removeWishItemAsync = createAsyncThunk<
  void,
  { productId: number;}
>(
  "wish/removeWishItemAsync",

  async ({ productId }, thunkAPI) => {
    try {
      await agent.WishList.removeFromWishlist(productId);
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    setWishList: (state: { wishlist: any }, action: { payload: any }) => {
      state.wishlist = action.payload;
    },
    clearWishList: (state: any) => {
      state.wishlist = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWishItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addWishItemAsync.fulfilled, (state, action) => {
      state.wishlist = action.payload;
      state.status = "idle";
      toast.success("Added product to Wishlist");
    });
    builder.addCase(addWishItemAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    builder.addCase(removeWishItemAsync.pending, (state, action) => {
      //const item =   state.cart?.items.find(i => i.productId === action.meta.arg.productId )

      state.status =
        "pendingRemoveItem" + action.meta.arg.productId
    });
    builder.addCase(removeWishItemAsync.fulfilled, (state, action) => {
      const { productId } = action.meta.arg;

      const itemIndex = state.wishlist?.items.findIndex(
        (i) => i.productId === productId
      );

      if (itemIndex === -1 || itemIndex === undefined) return;

      state.wishlist!.items.splice(itemIndex, 1);


      toast.success("Removed product to Wishlist");

      state.status = "idle";
    });

    builder.addCase(removeWishItemAsync.rejected, (state, action) => {
      state.status = "idle";
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

    builder.addMatcher(
      isAnyOf(addWishItemAsync.fulfilled, getWishListAsync.fulfilled),
      (state, action) => {
        state.wishlist = action.payload;
        state.status = "idle";

        console.log("Wishlist");

      }
    );

    builder.addMatcher(
      isAnyOf(addWishItemAsync.rejected, getWishListAsync.rejected),
      (state, action) => {
        state.status = "idle";
      }
    );
  },
});

export const { setWishList, clearWishList } = wishSlice.actions;

//
