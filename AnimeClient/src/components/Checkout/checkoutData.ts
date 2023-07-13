import CardLogo from "../../assets/images/icons/cardLogo";

export const config ={
    public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
    tx_ref: "titanic-48981487343MDI0NzMx",
    amount: 54600,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    redirect_url: "",
    meta: {
      consumer_id: 23,
      consumer_mac: "92a3-912ba-1192a",
    },
    customer: {
      email: "rose@unsinkableship.com",
      phonenumber: "08102909304",
      name: "Rose DeWitt Bukater",
    },
    customizations: {
      title: "The Titanic Store",
      description: "Payment for an awesome cruise",
      logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
    }
  };


  export const paymentOptions = [
    { value: "cash", label: "Cash on Delivery" },
    { value: "card", label: "Credit / Debit Card"},
  ];

    
        