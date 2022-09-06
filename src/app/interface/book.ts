import { Category } from "./category"
import { Detail } from "./detail";

export interface Book {
    id: number;
    category: Category;
    detail: Detail;
    title: string;
}