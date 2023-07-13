

    export interface CartItem {
        productId: number;
        name: string;
        price: number;
        description: string;
        category: string;
        quantityInStock: number;
        pictureUrl: string;
        quantity: number;
    }


    export interface PreOrder {
        merchType: string;
        merchText: string;
        materialType: string;
        materialColor: string;
        animeTheme: string;
        conceptSketchURL: string;
        description: string;
        quantity:number;
        
    }

    export interface Cart {
        id: number;
        buyerId: string;
        items: CartItem[];
        specials: PreOrder[];
        paymentIntentId?: string;
        clientSecret?: string;
        tranRef: string;
    }




