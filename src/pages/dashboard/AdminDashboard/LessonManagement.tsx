import { Button, Input, InputNumber, Table, Tag,Form, Modal } from "antd";
import { useDeleteLessonMutation, useGetAllLessonsQuery, useUpdateLessonMutation } from "../../../redux/feature/Endpoints/EndPoint";
import Swal from "sweetalert2";
import { useState } from "react";


const LessonManagement = () => {


    const { data, refetch } = useGetAllLessonsQuery(null);
    const [deleteLesson] = useDeleteLessonMutation()
    const [updateLesson] = useUpdateLessonMutation()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [currentLesson, setCurrentLesson] = useState(null)

    const handleDelete = (_id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteLesson(_id)
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "You successfully delete the user",
                        icon: "success"
                    });
                } catch (err) {
                    console.log(err)
                }
            }
        });
    }

    const handleUpdate = (lesson: any) => {
        console.log(lesson)
        setCurrentLesson(lesson);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentLesson(null);
    };

    const handleUpdateSubmit = (values: any) => {
        const { LessionName, LessionNumber } = values;
        const res = updateLesson({ _id: currentLesson?._id, LessionName, LessionNumber })
            .then(() => {
                refetch();
                Swal.fire({
                    title: "Updated!",
                    text: "Lesson updated successfully",
                    icon: "success",
                });
                setIsModalVisible(false);
                setCurrentLesson(null);
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "There was an issue updating the lesson",
                    icon: "error",
                });
                console.error(error);
            });
            console.log(res)
    };

    const columns = [
        {
            title: 'Lesson Name',
            dataIndex: 'LessionName',
            key: 'LessionName',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },
        {
            title: 'Lesson Number',
            dataIndex: 'LessionNumber',
            key: 'LessionNumber',
            render: (LessionNumber: number) => <Tag color="cyan">{LessionNumber}</Tag>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },
        {
            title: 'Vocabulary Count',
            dataIndex: 'vocabulary',
            key: 'vocabulary',
            render: (vocabulary: string[]) => vocabulary.length === 0 ? <Tag color="red">{0}</Tag> : <Tag color="green">{vocabulary.length}</Tag>,
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => new Date(text).toLocaleString(),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string) => new Date(text).toLocaleString(),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },
        {
            title: 'Delete Lesson',
            key: 'actions',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        className=' bg-red-700 text-white border-none'
                        onClick={() => handleDelete(record._id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
        {
            title: 'Update Lesson',
            key: 'actions',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (_, record) => (
                <div className="flex gap-2">
                  <Button
                    className="bg-purple-500 text-white border-none"
                    onClick={() => handleUpdate(record)}
                  >
                    Update
                  </Button>
                </div>
              ),
        },
    ];

    return (
        <div><h1>View Managing Lessons</h1>
            <Table
                dataSource={data?.data}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                responsive
                scroll={{ x: true }}
            />
            <Modal
                title="Update Lesson"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    initialValues={{
                        LessionName: currentLesson?.LessionName,
                        LessionNumber: currentLesson?.LessionNumber,
                    }}
                    onFinish={handleUpdateSubmit}
                >
                    <Form.Item
                        label="Lesson Name"
                        name="LessionName"
                        rules={[{ required: true, message: "Please enter the lesson name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Lesson Number"
                        name="LessionNumber"
                        rules={[{ required: true, message: "Please enter the lesson number!" }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Update Lesson
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default LessonManagement