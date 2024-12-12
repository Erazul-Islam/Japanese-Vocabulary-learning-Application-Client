import { Breakpoint, Table, Tag } from "antd";
import { useGetAllLessonsQuery } from "../../../redux/feature/Endpoints/EndPoint"


const ViewManagingLesson = () => {

  const { data } = useGetAllLessonsQuery(null);


  const columns = [
    {
      title: 'Lesson Name',
      dataIndex: 'LessionName',
      key: 'LessionName',
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
    },
    {
      title: 'Lesson Number',
      dataIndex: 'LessionNumber',
      key: 'LessionNumber',
      render: (LessionNumber: number) =>  <Tag color="cyan">{LessionNumber}</Tag>,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
    },
    {
      title: 'Vocabulary Count',
      dataIndex: 'vocabulary',
      key: 'vocabulary',
      render: (vocabulary: string[]) => vocabulary.length === 0 ? <Tag color="red">{0}</Tag> : <Tag color="green">{vocabulary.length}</Tag>,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => new Date(text).toLocaleString(),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as Breakpoint[],
    },
  ];

  return (
    <div>
      <h1>View Managing Lessons</h1>
      <Table
        dataSource={data?.data}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ViewManagingLesson