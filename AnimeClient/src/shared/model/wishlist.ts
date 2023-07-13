export interface WishListItem {
    productId: number;
    name: string;
    price: number;
    description: string;
    category: string;
    pictureUrl: string;
}

export interface WishList {
    id: number;
    userId: string;
    items: WishListItem[];
}