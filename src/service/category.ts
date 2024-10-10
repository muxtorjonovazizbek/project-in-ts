import https from "./config";
import { CategoryRequest } from "@types";

const category: CategoryRequest = {
    create: (data)=> https.post("/category/create", data),
    get: (params)=> https.get("/category/search", {params}),
    update: (id , data)=> https.patch(`/category/update/${id}`, data),
    delete: (id)=> https.delete(`/category/delete/${id}`),

}
export default category


export interface CategoryType {
    id:number;
    name:string;
    createdAt?:string;
    lastUpdatedAt?:string;
}