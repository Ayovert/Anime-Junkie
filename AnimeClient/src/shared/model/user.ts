import { Cart } from "./cart";

export interface User{
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        email: string;
        phoneNumber: string;
        username: string;
        token: string;
        cart: Cart;
        roles?: string[];
}

export interface UserAddress{
        fullName: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        telephone:string;
        mobile?: string;
}

/**
 * public string FullName {get; set;}
        public string Address1 {get; set;}

        public string Address2 {get; set;}
        public string  City {get; set;}
        
        public string State {get; set;}
        public string Country {get; set;}
        public string PostalCode {get; set;}

        public string Telephone {get; set;}

        public string Mobile {get;set;}
 */


