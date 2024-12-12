import { Button, Input, InputNumber, Table, Tag, Form, Modal, notification, Breakpoint } from "antd";
import { useDeleteLessonMutation, useGetAllLessonsQuery, } from "../../../redux/feature/Endpoints/EndPoint";
import Swal from "sweetalert2";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentToken } from "../../../redux/feature/auth/auth.slice";
import axios from "axios";
import { TLession } from "../../../utils/global";


const LessonManagement = () => {

    const { data, refetch } = useGetAllLessonsQuery(null);
    const [deleteLesson] = useDeleteLessonMutation()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [lessonId, setLessonId] = useState<string>()
    const token = useAppSelector(useCurrentToken);

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

    const handleUpdate = (id: string) => {
        setLessonId(id)
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUpdateSubmit = async (value: TLession) => {
        try {
            const res = await axios.put(
                `https://backend-psi-six-59.vercel.app/api/lession/${lessonId}`,
                {
                    ...value
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res)
            refetch();
            notification.success({
                message : "Updated",
                description : "Lesson updated successfully"
            });
            handleCancel();
        } catch (error) {
            console.error("Update failed:", error);
            notification.error({
                message : "opps",
                description : "Failed to update Lesson. Please try again."
            });
        }

    };

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
            render: (LessionNumber: number) => <Tag color="cyan">{LessionNumber}</Tag>,
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
        {
            title: 'Delete Lesson',
            key: 'actions',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (_ : unknown, record : TLession) => (
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
            render: (_ : unknown, record : TLession) => (
                <div className="flex gap-2">
                    <Button
                        className="bg-purple-500 text-white border-none"
                        onClick={() => handleUpdate(record._id)}
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
                scroll={{ x: true }}
            />
            <Modal
                title="Update Lesson"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    onFinish={handleUpdateSubmit}
                >
                    <Form.Item
                        label="Lesson Name"
                        name="LessionName"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Lesson Number"
                        name="LessionNumber"
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