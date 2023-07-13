import { createAsyncThunk, createEntityAdapter, createSlice, EntityId } from "@reduxjs/toolkit";
import agent from "../../shared/api/agent";
import { MetaData } from "../../shared/model/pagination";
import { Product, productImages, productParams } from "../../shared/model/product";
import { RootState } from "../../shared/redux/store";

interface ProductState{
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    categories: string[];
    animes:string[];
    productParams: productParams;
    metaData : MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

/*{
    selectId: (items) => items.id ,

    sortComparer: (a, b) => a.name.localeCompare(b.name)
}*/



function getAxiosParams(productParams : productParams){
    const params =  new URLSearchParams();
    params.append(
        'pageNumber', productParams.pageNumber.toString()
    );
    params.append(
        'pageSize', productParams.pageSize.toString()
    );
    params.append(
        'orderBy', productParams.orderBy
    );

    if(productParams.searchTerm)
    {
        params.append(
            'searchTerm', productParams.searchTerm
        );
    } 

    if(productParams.categories.length > 0)
    {
        params.append(
            'categories', productParams.categories.toString()
        );
    } 

    if(productParams.animes.length > 0)
    {
        params.append(
            'animes', productParams.animes.toString()
        );
    } 


    return params;
}


export const fetchProductsAsync = createAsyncThunk<Product[], void, {state:RootState}>(
    'product/fetchProductsAsync',
    async(_ , thunkAPI) => {
        const params  = getAxiosParams(thunkAPI.getState().product.productParams)
        try{
            const response = await agent.Product.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));


            //response.length !== undefined ? response : 
            return response.items;
        }catch(error : any){
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }

)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'product/fetchProductAsync',
    async(productId, thunkAPI) => {
        try{
            return await agent.Product.details(productId);
        }catch(error :any){
            return thunkAPI.rejectWithValue({error: error.data} );
            
        }
    }

)

export const fetchFilters = createAsyncThunk(
    'product/fetchFilters',
    async(_, thunkAPI) => {
        try{
            const filters =  agent.Product.filters();
            return filters;
        }catch(error : any){
            console.log(error);
            return thunkAPI.rejectWithValue({error: error.data} ); 
        }

    }
)

function initParams(){
    return{
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        categories: [],
        animes: []
    }
}

export const productSlice = createSlice({
    name: 'product',
    initialState: productsAdapter.getInitialState<ProductState>({
        productsLoaded : false,
        filtersLoaded: false,
        categories: [],
        animes: [],
        status : 'idle',
        productParams: initParams(),
        metaData: null,
       // product: []
    }),
    reducers:{
        setProductParams:(state: { productsLoaded: boolean; productParams: any; }, action: { payload: any; }) =>{
            state.productsLoaded =false;
            state.productParams ={...state.productParams, ...action.payload};

        },

        resetProductParams:(state: { productParams: { pageNumber: number; pageSize: number; orderBy: string; categories: string[]; }; }) => {
            state.productParams = initParams();
        },
        setMetaData: (state: { metaData: any; }, action: { payload: any; }) => {
            state.metaData = action.payload;
        },
        
        setProduct: (state: any, action: { payload: Product; }) => {
            productsAdapter.upsertOne(state, action.payload); // products loaded make this kind of pointless cos client will requery api
            state.productsLoaded = false;
        },
        removeProduct: (state: any, action: { payload: EntityId; }) => {
            productsAdapter.removeOne(state, action.payload);
            state.productsLoaded = false;
        }
    },
    extraReducers:(builder => {

        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts'
           
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state, action) => {

                productsAdapter.setAll(state, action.payload);
                state.status = 'idle';
            state.productsLoaded = true;
                
        
            
            
            
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
            state.filtersLoaded = true;    
        });


        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status ='idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchFilters.pending, (state) =>
        {
            state.status = 'pendingFetchFilters'
        })

        builder.addCase(fetchFilters.fulfilled, (state, action) =>
        {
            
            state.categories = action.payload.categories;
            state.animes = action.payload.animes;

            state.filtersLoaded = true;
            state.status ='idle'
        })
        
        builder.addCase(fetchFilters.rejected, (state, action) =>
        {
            state.status = 'idle';
            
        })



    })

})

export const  productSelectors = productsAdapter.getSelectors((state:RootState) => state.product);

export const { setProductParams, resetProductParams, setMetaData, setProduct, removeProduct} = productSlice.actions;


