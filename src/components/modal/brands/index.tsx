// import { useEffect, useState } from "react";
// import { Button, Modal, Form, Input, message, Select, Upload,  } from "antd";
// import { brands, category } from '@service';
// import {UploadOutlined} from "@ant-design/icons"
// import TextArea from "antd/es/input/TextArea";




// const Index = ({ open, handleCancel, update, getData }: any) => {
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [categoryList, setCategoryList] = useState([])
//   // const [edit, setEdit] = useState({
  
//   //   name: "",
//   //   categoryId: "",
//   //   description: ""
//   // })
//   // console.log(categoryList, "categoryLIsy");
//   // console.log(edit, "bu edit");
  

//   useEffect(()=> {
//     if (update.id) {
//         form.setFieldsValue({
//             name: update.name,
//             category_id: update.category_id,
//             description: update.description,
          
//         })
//     } else {
//         form.resetFields()
//     }     
//   },[update, form])


//   useEffect(()=> {
//     getCategories()
//   },[]) 

//   const getCategories = async () => {
//     try {
//       const res = await category.get()
//       // console.log(res, "get res");
      
//       setCategoryList(res?.data?.data?.categories)
//     } catch (error) {
//       console.log("Error", error);
//       message.error("Error getting categories")
//     }
//   }
  
//   const handleFileUpload = ({ file }) => {
//     form.setFieldsValue({ file });
//     return false; // Fayl avtomatik yuklanishidan to'xtatish
//   };

//   const handleSubmit = async (values) => {
//     console.log(values, 'brands val');
    
    
//       // setEdit({
//       //   name: values.name,
//       //   categoryId: parseInt(values.category_id),
//       //   description: values.description
//       // })
      
//     const formData = new FormData()
//     formData.append("name", values.name)
//     formData.append("category_id", parseInt(values.category_id))
//     formData.append("description", values.description)
//     if (values.file && values.file.file) {
//       formData.append("file", values.file.file)
//     }

 
    
//    if (update && update.id) {
//       setLoading(true)
//       try {
//         const res = await brands.update(update.id, values)
//         if (res.status === 200) {
          
//           message.success("Brands updated succesfully")
//           handleCancel()
//           getData()
//           console.log(getData(), "brands getData check");
          
//           setLoading(false)
//         }
        
//       } catch (error) {
//         console.log(error);
//         message.error("Error updating brands")
//         setLoading(false)
        
//       }

//    }else {
   
//     try {
//       const res = await brands.create(formData)
//       if (res.status === 201) {
//         message.success("Brands created succesfully")
//         handleCancel()
//         getData()
//         setLoading(false)
//       }
//       console.log(res, "res from create");
      
      
//     } catch (error) {
//       console.log(error);
//       message.error("Error creating brands")
//       setLoading(false)
//     }
//    }
    

      
//   }
//   return (
//     <>
//       <Modal
//         title={update && update.id ? "Edit Brand" : "Create Brand"}
//         open={open}
//         onCancel={handleCancel}
//         footer={false}
//       >
//         <Form
//           form={form}
//           name="subCategoryForm"
//           style={{ width: "100%", marginTop: "20px" }}
//           onFinish={ handleSubmit }
//           layout="vertical"
//         >
//           <Form.Item
//             label="Brand name"
//             name="name"
//             rules={[{required: true, message: "Enter brand name"}]}
//           >
//            <Input size="large"/> 
//           </Form.Item>

//           <Form.Item
//             label="Select Category"
//             name="category_id"
//             rules={[{required: true, message: "Select category name"}]}
//           >
//            <Select size="large" placeholder="Select category">
//            {
//               categoryList.map((category) => (
//                 <Select.Option key={category.id} value={category.id}>
//                  {category.name}
//                 </Select.Option>
//               ))}
//             </Select> 
//           </Form.Item>

//           {
//             !update.id && (
//               <Form.Item
//             label="Select File"
//             name="file"
//             rules={[{required: true, message: "Select category name"}]}
//           >
//             <Upload beforeUpload={handleFileUpload}>
//                <Button icon={<UploadOutlined />}>Click to Upload</Button>
//             </Upload>
//           </Form.Item>
//             )
//           }

//           <Form.Item
//             label="Add Desc..."
//             name="description"
//             rules={[{required: true, message: "Add Description"}]}
//           >
//            <TextArea/> 
//           </Form.Item>

//           <Form.Item>
//             <Button
//                 size="large"
//                 style={{width: "100%"}}
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//             >
      
//               {update && update.id ? "Update" : "Add"}
              
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };
// export default Index;

// import { useEffect, useState } from "react";
// import { Button, Modal, Form, Input, message, Select, Upload } from "antd";
// import { brands, category } from '@service';
// import { UploadOutlined } from "@ant-design/icons";
// import TextArea from "antd/es/input/TextArea";

// // 💡 Interfeyslar bilan turlarni aniqladik
// interface Category {
//   id: number;
//   name: string;
// }

// interface BrandUpdate {
//   id?: number;
//   name: string;
//   category_id: number;
//   description: string;
//   file?: File;
// }

// interface Props {
//   open: boolean;
//   handleCancel: () => void;
//   update: BrandUpdate;
//   getData: () => void;
// }

// const Index = ({ open, handleCancel, update, getData }:Props) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [form] = Form.useForm();
//   const [categoryList, setCategoryList] = useState<Category[]>([]);

//   useEffect(() => {
//     if (update.id) {
//       form.setFieldsValue({
//         name: update.name,
//         category_id: update.category_id,
//         description: update.description,
//       });
//     } else {
//       form.resetFields();
//     }
//   }, [update, form]);

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const getCategories = async () => {
//     try {
//       const res = await category.get();
//       setCategoryList(res?.data?.data?.categories);
//     } catch (error: any) {
//       console.error("Error", error);
//       message.error("Error getting categories");
//     }
//   };

//   const handleFileUpload = ({ file }: { file: File }) => {
//     form.setFieldsValue({ file });
//     return false; // Fayl avtomatik yuklanishidan to'xtatish
//   };

//   const handleSubmit = async (values: BrandUpdate) => {
//     const formData = new FormData();
//     formData.append("name", values.name);
//     formData.append("category_id", values.category_id.toString());
//     formData.append("description", values.description);

//     if (values.file) {
//       formData.append("file", values.file);
//     }

//     setLoading(true);
//     try {
//       if (update.id) {
//         const res = await brands.update(update.id, values);
//         if (res.status === 200) {
//           message.success("Brand updated successfully");
//           handleCancel();
//           getData();
//         }
//       } else {
//         const res = await brands.create(formData);
//         if (res.status === 201) {
//           message.success("Brand created successfully");
//           handleCancel();
//           getData();
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       message.error(update.id ? "Error updating brand" : "Error creating brand");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       title={update.id ? "Edit Brand" : "Create Brand"}
//       open={open}
//       onCancel={handleCancel}
//       footer={false}
//     >
//       <Form
//         form={form}
//         name="brandForm"
//         style={{ width: "100%", marginTop: "20px" }}
//         onFinish={handleSubmit}
//         layout="vertical"
//       >
//         <Form.Item
//           label="Brand name"
//           name="name"
//           rules={[{ required: true, message: "Enter brand name" }]}
//         >
//           <Input size="large" />
//         </Form.Item>

//         <Form.Item
//           label="Select Category"
//           name="category_id"
//           rules={[{ required: true, message: "Select category" }]}
//         >
//           <Select size="large" placeholder="Select category">
//             {categoryList.map((category) => (
//               <Select.Option key={category.id} value={category.id}>
//                 {category.name}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         {!update.id && (
//           <Form.Item
//             label="Select File"
//             name="file"
//             rules={[{ required: true, message: "Select file" }]}
//           >
//             <Upload beforeUpload={handleFileUpload}>
//               <Button icon={<UploadOutlined />}>Click to Upload</Button>
//             </Upload>
//           </Form.Item>
//         )}

//         <Form.Item
//           label="Add Description"
//           name="description"
//           rules={[{ required: true, message: "Add description" }]}
//         >
//           <TextArea />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             size="large"
//             style={{ width: "100%" }}
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//           >
//             {update.id ? "Update" : "Add"}
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default Index;

import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message, Select, Upload } from "antd";
import { brands, category } from "@service";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

// 💡 Interfeyslar bilan turlarni aniqladik
interface Category {
  id: number;
  name: string;
}


interface BrandUpdate {
  id?: number;
  name: string;
  category_id: number;
  description: string;
  file?: File;
}

interface Props {
  open: boolean;
  handleCancel: () => void;
  update: BrandUpdate;
  getData: () => void;
}

const Index = ({ open, handleCancel, update, getData }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  // 💡 Kategoriya va form ma'lumotlarini olish
  useEffect(() => {
    if (update.id) {
      form.setFieldsValue({
        name: update.name,
        category_id: update.category_id,
        description: update.description,
      });
    } else {
      form.resetFields();
    }
  }, [update, form]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await category.get<Category[]>;
      setCategoryList(res?.data?.data?.categories);
    } catch (error: any) {
      console.error("Error", error);
      message.error("Error getting categories");
    }
  };

  // 💡 Faylni form-data bilan boshqarish
  const handleFileUpload = ({ file }: { file: File }) => {
    form.setFieldsValue({ file });
    return false; // Fayl avtomatik yuklanishidan to'xtatish
  };

  const handleSubmit = async (values: BrandUpdate) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category_id", values.category_id.toString());
    formData.append("description", values.description);

    if (values.file) {
      formData.append("file", values.file);
    }

    setLoading(true);
    try {
      if (update.id) {
        // 💡 FormData dan foydalanish update paytida ham kerak
        const res = await brands.update(update.id, formData); 
        if (res.status === 200) {
          message.success("Brand updated successfully");
          handleCancel();
          getData();
        }
      } else {
        const res = await brands.create(formData);
        if (res.status === 201) {
          message.success("Brand created successfully");
          handleCancel();
          getData();
        }
      }
    } catch (error) {
      console.error(error);
      message.error(update.id ? "Error updating brand" : "Error creating brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={update.id ? "Edit Brand" : "Create Brand"}
      open={open}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        name="brandForm"
        style={{ width: "100%", marginTop: "20px" }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Brand name"
          name="name"
          rules={[{ required: true, message: "Enter brand name" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Select Category"
          name="category_id"
          rules={[{ required: true, message: "Select category" }]}
        >
          <Select size="large" placeholder="Select category">
            {categoryList.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {!update.id && (
          <Form.Item
            label="Select File"
            name="file"
            rules={[{ required: true, message: "Select file" }]}
          >
            <Upload beforeUpload={handleFileUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        )}

        <Form.Item
          label="Add Description"
          name="description"
          rules={[{ required: true, message: "Add description" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {update.id ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Index;
