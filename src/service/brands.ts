import https from "./config";
import { BrandsRequest } from "@types";

const brands: BrandsRequest = {
    create: (data)=> https.post("/brands/create", data),
    get: (params)=> https.get("/brands/search", {params}),
    update: (id , data)=> https.patch(`/brands/update/${id}`, data),
    delete: (id)=> https.delete(`/brands/delete/${id}`),

}
export default brands


