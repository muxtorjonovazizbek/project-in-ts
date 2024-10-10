
import { Table } from 'antd';
import type { TablePaginationConfig } from 'antd';

type TablePropsType = {
    data: any[]
    pagination: TablePaginationConfig
    onChange: (pagination: TablePaginationConfig) => void
    columns: any[]
}



const Index = ({columns, data, pagination, onChange}: TablePropsType) => 
<Table 
    columns={columns} 
    dataSource={data}
    pagination={pagination}
    onChange={(pagination) => onChange(pagination)}
    bordered
/>;
export default Index;    