import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
  
  import App from "../App";
  import { 
    SignIn, 
    SignUp, 
    LayoutPage,
    Product,
    Category,
    Brands,
    BrandCategory,
    Ads
  } from "@pages";


const Index = () => {
    const router = createBrowserRouter( 
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            
              {/* <Route path="*" element={<NotFound />} /> */}

            <Route path="layout" element={<LayoutPage />} >
              <Route index element={<Product />} />
              <Route path="category" element={<Category />} />
              {/* <Route path="sub-category/:id" element={<SubCategory />} /> */}
              <Route path="brands" element={<Brands />} />
              <Route path="brand-category" element={<BrandCategory />} />
              <Route path="ads" element={<Ads />} />
            </Route>

          </Route>
        )
      );
  return <RouterProvider router={router} />
}

export default Index