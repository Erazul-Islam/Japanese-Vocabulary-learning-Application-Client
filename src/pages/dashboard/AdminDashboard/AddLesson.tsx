import { notification } from "antd";
import { useCreateLessonMutation, useGetAllLessonsQuery } from "../../../redux/feature/Endpoints/EndPoint"
import { Form, Input, Button} from "antd";

const AddLesson = () => {

    const [form] = Form.useForm();
    const [createLesson, { isLoading }] = useCreateLessonMutation();
    const {refetch} = useGetAllLessonsQuery(null)

    const handleSubmit = async (values: { LessionName: string; LessionNumber: number }) => {
        try {
            
            const response = await createLesson(values).unwrap();
            refetch()
            notification.success({
                message : "Wow",
                description : "great"
            })
            console.log("Response:", response);
            form.resetFields();
        } catch (error) {
            console.error("Error creating lesson:", error);
            notification.error({
                message : "opps",
                description : "Bad"
            });
        }
    };


    return (
        <div>
            <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Lesson</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ LessionName: "", LessionNumber: undefined }}
                >
                    {/* Lesson Name Input */}
                    <Form.Item
                        label="Lesson Name"
                        name="LessionName"
                        rules={[{ required: true, message: "Please enter the lesson name!" }]}
                    >
                        <Input placeholder="Enter lesson name" />
                    </Form.Item>

                    {/* Lesson Number Input */}
                    <Form.Item
                        label="Lesson Number"
                        name="LessionNumber"
                        rules={[
                            { required: true, message: "Please enter the lesson number!" },
                            // { type: "number", message: "Lesson number must be a number!" },
                        ]}
                    >
                        <Input type="number" placeholder="Enter lesson number" />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className="w-full"
                        >
                            {isLoading ? "Creating..." : "Create Lesson"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddLesson