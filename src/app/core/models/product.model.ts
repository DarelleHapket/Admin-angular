export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    is_active: boolean;
    rating: number;
    images?: string[];
    cat_ids?: number[];
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    quantity: number;
    is_active: boolean;
    rating: number;
    images: File[];
    cat_ids: number[];
}