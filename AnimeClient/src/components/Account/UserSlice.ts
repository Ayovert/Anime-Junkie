import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { string } from "yup";
import agent from "../../shared/api/agent";
import { User, UserAddress } from "../../shared/model/user";
import { getCookie } from "../../shared/util/util";
import { setCart } from "../Cart/cartSlice";

const isBrowser = typeof window !== "undefined";

//for roles- decode JWT token.. check JWT.IO

interface UserState {
  user: User | null;
  userAddress: UserAddress | null;
}

const initialState: UserState = {
  user: null,
  userAddress: null
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "user/signIn",
  async (data, thunkAPI) => {
    try {
      const userDto: any = await agent.User.login(data);
      const { cart, ...user } = userDto;

      if (cart) {
        thunkAPI.dispatch(setCart(cart));
      }

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  "user/getCurrentUser",
  async (_, thunkAPI) => {
    if (isBrowser) {
      thunkAPI.dispatch(
        setUser(
          JSON.parse(
            localStorage.getItem("user")! ?? getCookie("userLoginInfo")
          )
        )
      );
    }

    try {
      const userDto = await agent.User.currentUser();

      const { cart, ...user } = userDto;

      if (cart) {
        thunkAPI.dispatch(setCart(cart));
      }
    
      thunkAPI.dispatch(getUserAddress());

      if (user) localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error: any) {
      // setTimeout(() => {
      //   navigate("/");
      //}, 2000) ;

      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (
        (!localStorage.getItem("user") ||
          localStorage.getItem("user") === null) &&
        (!getCookie("userLoginInfo") || getCookie("userLoginInfo") === "")
      ) {
        return false;
      }
    },
  }
);


export const getUserAddress = createAsyncThunk<UserAddress>(
  "user/getUserAddress",
  async(_, thunkAPI) => {

    try{
      
      const address  = await agent.User.fetchAddress();
   
      if(typeof address === 'string' && address === ""){
        return null;
      }

      return address;
    }
    catch(error: any){
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)

export const externalLoginConfirmation = createAsyncThunk<
  User,
  { navigate: NavigateFunction }
>(
  "user/getExternalLogin",
  async ({ navigate }, thunkAPI) => {
    const email = getCookie("userEmail");

    try {
      const userDto = await agent.User.socialExternalConfirmation({
        email: email,
      });
      const { cart, ...user } = userDto;

      if (cart) {
        thunkAPI.dispatch(setCart(cart));
      }

      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error: any) {
      setTimeout(() => {
        navigate("/");
      }, 2000);

      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (
        localStorage.getItem("user") ||
        localStorage.getItem("user") !== null ||
        !getCookie("userEmail")
      ) {
        return false;
      }
    },
  }
);

//document.cookie = "userLoginInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state: any) => {
      state.user = null;
      document.cookie =
        "userLoginInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("user");
    },
    setUser: (state: { user: any }, action: { payload: any }) => {
      let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
    setAddress:(state: { userAddress: any }, action: { payload: any } ) => {
      console.log(action.payload);
        state.userAddress = action.payload
    
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.user = null;
      document.cookie =
        "userLoginInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("user");
      toast.error("Session expired- please log in again");
    });

    builder.addCase(externalLoginConfirmation.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("userEmail");
    });

    builder.addCase(signInUser.rejected, (_, action) => {
      throw action.payload;
    });

    builder.addCase(getUserAddress.rejected, (state) => {
      state.userAddress = null;
    });

    builder.addCase(getUserAddress.fulfilled, (state, action) => {
      
      state.userAddress =  action.payload;
    });

    builder.addMatcher(
      isAnyOf(
        signInUser.fulfilled,
        getCurrentUser.fulfilled,
        externalLoginConfirmation.fulfilled
      ),
      (state, action) => {
        let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
        let roles =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        state.user = {
          ...action.payload,
          roles: typeof roles === "string" ? [roles] : roles,
        };
      }
    );
  },
});

export const { signOut, setUser } = userSlice.actions;
