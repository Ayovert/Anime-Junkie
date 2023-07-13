import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../model/pagination";
import { store } from "../redux/store";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = true;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") {
      await sleep();
    }

    const pagination = response.headers["pagination"];

    if (pagination) {
      let responseData =
        response.data.length !== undefined
          ? response.data
          : response.data.items;
      response.data = new PaginatedResponse(
        responseData,
        JSON.parse(pagination)
      );

      return response;
    }
    return response;
  },
  (error: AxiosError) => {

    if (error.response) {

      const { data, status } = error.response;

      //const categoryData = data.categories as Category[];

      const datax = data as any;
      switch (status) {
        case 400:
          if (datax.errors) {
            const modelStateErrors: string[] = [];
            for (const key in datax.errors) {
              if (datax.errors[key]) {
                modelStateErrors.push(datax.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          }

          break;
        case 401:
          toast.error(datax.title);
          break;
        case 403:
          toast.error("You are not allowed to do that");
          break;
        case 404:
          break;
        case 500:
          toast.error("could not load data from server");
          break;
        default:
          break;
      }
      return Promise.reject(error.response);
    }

    return Promise.reject(error);
  }
);

//format response from api
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(
  (config: any) => {
    const token = store.getState().user.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),

  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody),
};

function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
    if(key === 'files'){

      item[key].forEach((value: any)=> {
        formData.append(key, value);
        
      });
      console.log(formData);
    }
    else{
      formData.append(key, item[key]);
    }
   
    
  }

  return formData;
}

const Product = {
  list: (params: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`products/${id}`),
  filters: () => requests.get("products/filters"),
};


const Cart = {
  get: () => requests.get("cart"),
  addToCart: (productId: number, quantity = 1) =>
    requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
  removeFromCart: (productId: number, quantity = 1) =>
    requests.delete(`cart?productId=${productId}&quantity=${quantity}`),
    addSpecialOrder:(values: any)=>
    requests.postForm("cart/specialorders", createFormData(values))
};

const User = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  socialLogin: (provider: string) =>
    requests.get(`account/externalLogin?provider=${provider}`),
  socialLoginCallback: () => requests.get(`account/externalLoginCallback`),
  socialExternalConfirmation: (values: any) =>
    requests.post(`account/extLoginConfirmation`, values),
  currentUser: () => requests.get("account/currentUser"),
  fetchAddress: () => requests.get("account/savedAddress"),
  verifyEmail: (token: string, email: string) =>
    requests.get(`account/verifyEmail?token=${token}&email=${email}`),
};

const Review = {
  get:()=> requests.get("review"),
  post:(review: any) => requests.postForm("review", createFormData(review))
  //requests.post("review", values)
}

const Admin = {
  createProduct: (product: any) =>
    requests.postForm("products", createFormData(product)),
  updateProduct: (product: any) =>
    requests.putForm("products", createFormData(product)),
  deleteProduct: (id: number) => requests.delete(`products/${id}`),
  
  deleteImage: (productId: number, publicId: string) => requests.delete(`products/deleteImage?productId=${productId}&publicId=${publicId}`)
};

const Image = {
  getImage: (productId: number) => requests.get(`images/${productId}`),
  deleteImage: (publicId: string) => requests.delete(`images/${publicId}`)
}

const Orders = {
  list: () => requests.get("orders"),
  get: (id: number) => requests.get(`orders/${id}`),
  getByTranRef: (tranRef: string) => requests.get(`orders/tranRef/${tranRef}`),
  create: (values: any) => requests.post("orders", values),
};

const Payment = {
  createPaymentIntent: () => requests.post("payments", {}),
  createFlutterPayment: () => requests.post("payments/flutter", {}),
  verifyPayment: (tranId: number) =>
    requests.post(`payments/verifyTran?tranId=${tranId}`, {}),
};

const WishList = {
  get: () => requests.get("wishlist"),
  addToWishlist: (productId: number) =>
    requests.post(`wishlist?productId=${productId}`, {}),
  removeFromWishlist: (productId: number) =>
    requests.delete(`wishlist?productId=${productId}`),
};

const TestErrors = {
  get404Error: () => requests.get("buggy/not-found"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get400Error: () => requests.get("buggy/bad-request"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
  Product,
  TestErrors,
  Cart,
  User,
  Admin,
  Image,
  Orders,
  Payment,
  WishList,
  Review
};

export default agent;

/*const response = await got.post("https://api.flutterwave.com/v3/payments", {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
        },
        json: {
            tx_ref: "hooli-tx-1920bbtytty",
            amount: "100",
            currency: "NGN",
            redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
            meta: {
                consumer_id: 23,
                consumer_mac: "92a3-912ba-1192a"
            },
            customer: {
                email: "user@gmail.com",
                phonenumber: "080****4528",
                name: "Yemi Desola"
            },
            customizations: {
                title: "Pied Piper Payments",
                logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
            }
        }
    }).json();*/
