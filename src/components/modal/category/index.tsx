import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { category } from '@service'


// interface CategoryFormProps {
//   open: boolean;
//   handleCancel: () => void;
//   update: { id: number; name: string }; 
//   getData: () => void;
// }
const Index = ({ open, handleCancel, update, getData}: any) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(()=> {
    if (update) {
        form.setFieldsValue({
            name: update.name
        })
    } else {
        form.resetFields()
    }
  },[update, form])

 
  const handleSubmit = async (values: any) => {
  
    

      if (update && update.id) {
         setLoading(true)
         try {
          const res = await category.update(update.id,values)
          console.log(res, "from edit category");
          
          message.success("Category successfully updated");
          getData()
          console.log("update");
    
        } catch (error) {
          console.log(error);
          message.error("Category is not updated");
           
          
        }
        
        
      }else {
        try {
          const res = await category.create(values)
          console.log(res, "from");
          
          message.success("Category successfully created");
          getData()
          console.log(res, "create");

        } catch (error) {
          console.log(error);
          message.error("Category is not created");
          
        }
       
       
      }
      
      handleCancel()
      setLoading(false)
      
      
  }
  return (
    <>
      <Modal
        title={update && update.id ? "Edit Category" : "Create Category"}
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="categoryForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Category name"
            name="name"
            rules={[{required: true, message: "Enter category name"}]}
          >
           <Input size="large"/> 
          </Form.Item>

          <Form.Item>
            <Button
                size="large"
                style={{width: "100%"}}
                type="primary"
                htmlType="submit"
                loading={loading}
            >
                {update && update.id  ? "Update" : "Add"}
              
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Index;
 