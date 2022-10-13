export interface Product {
    id: number
    title: string,
    description: string,
    img: string,
    price: number,
    fuel: string,
    flag: boolean,
    categoryId: number,
}

export type NewProduct = Omit<Product, 'id' | 'categoryId'>;
