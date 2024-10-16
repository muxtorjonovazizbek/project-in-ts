import { EditOutlined, LinkOutlined,   } from '@ant-design/icons';
import { Button, Tooltip, Space, Input, message } from 'antd';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { category } from '@service';
import { GlobalTable, ConfirmDelete } from "@components";
import { Category } from '@modal';
import { CategoryType } from '@types';


interface ParamsType {
    search: string,
    limit: number,
    page: number
}
const initialValue ={
  id:0,
  name:""
}

const Index: React.FC = () => {
  const [total, setTotal] = useState<number>(0)
  const [data,setData] = useState<CategoryType[]>([]) 
  const [open, setOpen] = useState<boolean>(false)
  const [update, setUpdate] = useState<CategoryType>()
  
  const [params, setParams] = useState<ParamsType>({
    search: "",
    limit: 2,
    page: 1
  })

  const {search} = useLocation()
  const navigate = useNavigate()

  const getData = async () => {
  try {  
    const res = await category.get(params)
    console.log(res);
    
    setData(res?.data?.data?.categories)
    setTotal(res?.data?.data?.count)
  } catch (error) {
    console.log(error);
    
  }
  }

  useEffect(()=> {
    getData()
  },[params])

  useEffect(()=> {
    const params = new URLSearchParams(search)
    let page = Number(params.get("page")) || 1
    let limit = Number(params.get("limit")) || 3
    let search_value = params.get("search") || ""
    setParams((prev)=> ({
      ...prev,
      page: page,
      limit: limit,
      search: search_value
    }))
  }, [search])


  const editItem = (item: CategoryType) => {
    setUpdate(item)
    setOpen(true)
    
  }

//   const deleteItem = (id) => {
//     console.log(id);
    
//   }

  const handleTableChange = (pagination: any) => {
    console.log(pagination, 'pagination')
    const {current, pageSize} = pagination
    setParams((prev)=>({
      ...prev,
      limit: pageSize,
      page: current
    }))
    const params = new URLSearchParams(search)
    params.set('page', `${current}`)
    params.set('limit', `${pageSize}`)
    navigate(`?${params}`)
  }

  const handleCancel = ()=> {
    setOpen(false)
    setUpdate(initialValue)
    
  }

  const handleDelete = async (id: number)=> {
    try {
      await category.delete(id)
      setData(data.filter((item) => item.id !== id))
      setTotal(total - 1)
      message.success("Category successfully deleted");
    } catch (error) {
      console.log("Error deleting itme", error);
      message.error("Error deleting the category");
    }    
  }

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>)=> {
    setParams((prev)=> ({
      ...prev,
      search: evt.target.value
    }))
    const search_params = new URLSearchParams(search)
    search_params.set("search", evt.target.value)
    navigate(`?${search_params}`)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record : CategoryType) => (
        <Space size="middle">
          <Tooltip title="Edit">
              <Button type="default" onClick={()=> editItem(record)} icon={<EditOutlined/>}/>
          </Tooltip>
        
          <Tooltip title="Delete">
              <ConfirmDelete id={record.id} deleteItem={handleDelete}/>
          </Tooltip>

          <Tooltip title="Link">
              <Button type="default" onClick={()=> navigate(`/owner/sub-category/${record.id}`)} icon={<LinkOutlined />}/>
            
          </Tooltip>
        </Space>
      ),
    },
    
  ];
  return (
    <>
      <h3 className='pl-2 py-2 font-bold fs-4 text-center'>Category</h3>
      
      <Category open={open} handleCancel={handleCancel} update={update} setUpdate={setUpdate} setData={setData} getData={getData}/>
      
      <div className='flex justify-between items-center'>
      <Input  style={{width: "300px"}} value={params.search} placeholder="Basic usage" onChange={handleSearch} />
      <Button type='primary' className='mb-3' onClick={()=> setOpen(true)}>Create...</Button>
      </div>
      <GlobalTable
      columns={columns} 
      data={data}
      pagination={{
        current: params.page,
        pageSize: params.limit,
        total: total,
        showSizeChanger: true,  
        pageSizeOptions: ['2', '5', '7', '10','12']
      }}
      onChange={handleTableChange}
      />
    </>
  )
}

export default Index

