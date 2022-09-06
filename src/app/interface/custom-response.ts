import { Book } from "./book";
import { Category } from "./category";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: String;
    message: String;
    data: {categories?: Category[], category?: Category, books?: Book[], book?: Book};
}