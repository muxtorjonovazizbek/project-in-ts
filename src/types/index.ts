// ========================= Auth ============================



 

export interface SignIn {
    phone_number: string,
    password: string
}


export interface SignUp extends SignIn {
    first_name: string,
    last_name: string,
    email: string

}

 export interface AuthRequest {
    sign_in: (data: SignIn)=> Promise<any>,
    sign_up: (data: SignUp)=> Promise<any>
}



    // ===================== Category ==================

 
    interface Get {
        search: string, 
        limit: number,
        page: number
    }
    

    export interface CategoryType {
        id:number;
        name:string;
        createdAt?:string;
        lastUpdatedAt?:string;
    }

    export interface CategoryRequest {
        create: (data: CategoryType)=> Promise<any>,
        get: (params: Get)=> Promise<any>,
        update: (id: number, data:CategoryType)=> Promise<any>,
        delete: (id: number)=> Promise<any>,
    }


// ===================== Brands ==================
 

export interface GetBrands {
    search: string, 
    limit: number,
    page: number
}


export interface BrandsType {
    id:number;
    name:string;
    createdAt?:string;
    lastUpdatedAt?:string;
}

export interface BrandsRequest {
    create: (data: BrandsType)=> Promise<any>,
    get: (params: GetBrands)=> Promise<any>,
    update: (id: number, data:BrandsType)=> Promise<any>,
    delete: (id: number)=> Promise<any>,
}