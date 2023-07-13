export interface Category {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    modifiedAt?: Date;
    deletedAt?: Date;
}
export interface Product{
    //from json2ts
        id: number;
        name: string;
        description: string;
        category: string;
        quantityInStock: number;
        price: number;
        discountId: number;
        pictureUrl: string;
        images: productImages[]

}

export interface productImages{
    publicId: string;
    pictureUrl: string;
    productId: number;
}

export interface productParams{
    orderBy: string;
    searchTerm?: string;
    categories:string[];
    animes: string[];
    pageNumber: number;
    pageSize: number;

}