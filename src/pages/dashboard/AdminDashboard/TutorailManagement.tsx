import { Button, Input, Table, Form, notification } from "antd";
import { useCreateTutorialMutation, useDeleteTutorialMutation, useGetAllTutorialQuery } from "../../../redux/feature/Endpoints/EndPoint";
import Swal from "sweetalert2";


const TutorailManagement = () => {

    const { data, refetch } = useGetAllTutorialQuery({})
    const [deleteTutorial] = useDeleteTutorialMutation()
    const [createTutorial,{isLoading}] = useCreateTutorialMutation()
    const [form] = Form.useForm();


    const handleSubmit = async (values: { Link: string }) => {
        try {

            const response = await createTutorial(values).unwrap();
            refetch()
            notification.success({
                message: "Wow",
                description: "You added a new tutorial"
            })
            console.log("Response:", response);
            form.resetFields();
        } catch (error) {
            console.error("Error creating lesson:", error);
            notification.error({
                message: "opps",
                description: "Try Again"
            });
        }
    };

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
                    deleteTutorial(_id)
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





    const columns = [
        {
            title: 'Tutorail Link',
            dataIndex: 'Link',
            key: 'LessionName',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },

        {
            title: 'Delete Tutorial',
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
    ];


    return (
        <div>
            <div><h1>View Managing Tutorial</h1>
                <Table
                    dataSource={data?.data}
                    columns={columns}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                    responsive
                    scroll={{ x: true }}
                />
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{width:300}}
            >
                <Form.Item
                    label="Tutorail Link"
                    name="Link"
                    rules={[{ required: true, message: "Please enter the Tutorial!" }]}
                >
                    <Input placeholder="Enter Tutorial link" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        className="w-full"
                    >
                        {isLoading ? "Creating..." : "Create Tutorial"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TutorailManagement;