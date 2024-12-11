import { Button, Form, Input, notification, Table, Tag } from "antd"
import { useAppSelector } from "../../../redux/hook"
import { RootState } from "../../../redux/store"
import { useCreateVocabularyMutation, useGetAllLessonsQuery } from "../../../redux/feature/Endpoints/EndPoint"
import { IVocabulary } from "../../../utils/global"
// import axios from "axios"


const AddVocabulary = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)

    const [form] = Form.useForm();
    const [createVocabulary] = useCreateVocabularyMutation()
    const { data, isLoading: lessonsLoading } = useGetAllLessonsQuery(null)

    const handleAddVocabulary = async (lessonId: string, values: IVocabulary) => {
        console.log(lessonId)

        const vocabulary = {
            ...values,
            adminEmail: user?.email,
            userId: user?._id,
            userName: user?.name,
        };
        console.log(vocabulary)
        try {
            const res = await axios.post(`http://localhost:5000/api/lession/${lessonId}/add-vocabulary`, {vocabulary})
            // const res = await createVocabulary({lessonId,vocabulary}).unwrap()

            console.log(res)
            notification.success({
                message: "Vocabulary Added",
                description: "The vocabulary has been successfully added to the lesson.",
            });
            form.resetFields();
        } catch (err) {
            console.log(err)
            notification.error({
                message: "Failed to Add Vocabulary",
                description: "An unexpected error occurred.",
            });
        }
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
            title: 'Add Lesson',
            key: 'actions',
            responsive: ['xs', 'sm', 'md', 'lg'] as ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')[],
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        className=' bg-purple-600 text-white border-none'
                        onClick={() => showModal(record._id)}
                    >
                        Add Vocabulary
                    </Button>
                </div>
            ),
        },
    ];

    const showModal = (lessonsId: string) => {
        console.log(lessonsId)
        form.setFieldsValue({
            word: "f",
            pronunciation: "g",
            whenToSay: "h",
            lessonNo: 1,
        });

        notification.info({
            message: `Adding Vocabulary`,
            description: (
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={(values) => handleAddVocabulary(lessonsId, values)}
                >
                    <Form.Item
                        label="Word"
                        name="word"
                        rules={[{ required: true, message: "Please enter the word" }]}
                    >
                        <Input placeholder="Enter the word" />
                    </Form.Item>

                    <Form.Item
                        label="Pronunciation"
                        name="pronunciation"
                        rules={[
                            { required: true, message: "Please enter the pronunciation" },
                        ]}
                    >
                        <Input placeholder="Enter the pronunciation" />
                    </Form.Item>

                    <Form.Item
                        label="When to Say"
                        name="whenToSay"
                        rules={[{ required: true, message: "Please enter when to say" }]}
                    >
                        <Input placeholder="Enter the usage context" />
                    </Form.Item>

                    <Form.Item
                        label="Lesson Number"
                        name="lessonNo"
                        rules={[
                            { required: true, message: "Please enter the lesson number" },
                        ]}
                    >
                        <Input type="number" placeholder="Enter the lesson number" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={lessonsLoading}
                        disabled={lessonsLoading}
                    >
                        Add Vocabulary
                    </Button>
                </Form>
            ),
        });
    };


    return (
        <div>
            <Table
                dataSource={data?.data}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                responsive
                loading={lessonsLoading}
                scroll={{ x: true }}
            />
        </div>
    )
}

export default AddVocabulary