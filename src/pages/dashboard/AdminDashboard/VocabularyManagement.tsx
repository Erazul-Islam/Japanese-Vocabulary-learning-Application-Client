import { useState } from "react";
import { Table, Button, Space, Select, message, Form, Modal, Input, notification } from "antd";
import { useDeleteVocabularyMutation, useGetAllLessonsQuery } from "../../../redux/feature/Endpoints/EndPoint";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentToken } from "../../../redux/feature/auth/auth.slice";
import { IVocabulary, TLession } from "../../../utils/global";
import { ColumnType } from "antd/es/table";


const { Option } = Select;

const VocabularyManagement = () => {
    const { data, refetch } = useGetAllLessonsQuery(null);
    const [filteredData, setFilteredData] = useState<IVocabulary[]>([]);
    const [filterLessonNo, setFilterLessonNo] = useState(0);
    const [deleteVocabulary] = useDeleteVocabularyMutation()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentVocabulary, setCurrentVocabulary] = useState(null);
    const [currentLessontId, setCurrentLessonId] = useState<string | null>(null);
    const [currentVocabularytId, setCurrentVocabularyId] = useState<string | null>(null);
    const [form] = Form.useForm();
    const token = useAppSelector(useCurrentToken);


    const vocabularies = data?.data?.map((lesson: TLession) => ({
        lessonId: lesson._id,
        vocabulary: lesson.vocabulary,
    })).flatMap(lesson => lesson.vocabulary) || [];

    const handleDelete = (id: string, vocabularyId: string) => {
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
                    setFilteredData(filteredData.filter((vocab) => vocab._id !== vocabularyId))
                    deleteVocabulary({ id, vocabularyId })
                        .unwrap()
                        .then(() => {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Vocabulary successfully deleted.",
                                icon: "success",
                            });
                        })
                } catch (err) {
                    console.log(err)
                    message.error("Error")
                }
            }
        });
    };

    const handleEdit = (lessonId: string, vocabularyId: string) => {
        setCurrentLessonId(lessonId);
        setCurrentVocabularyId(vocabularyId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentVocabulary(null);
        form.resetFields();
    };


    const handleUpdate = async (values: IVocabulary) => {

        try {
            
            const res = await axios.put(
                `https://backend-psi-six-59.vercel.app/api/lession/${currentLessontId}/vocabulary/${currentVocabularytId}`,
                {
                    vocabulary: [
                        {
                            word: values.word,
                            pronunciation: values.pronunciation,
                            whenToSay: values.whenToSay,
                            lessonNo: values.lessonNo,
                        },
                    ],
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
                message : "Great",
                description : "Vocabulary updated successfully!"
            });
            handleCancel();
        } catch (error) {
            console.error("Update failed:", error);
            message.error("Failed to update vocabulary. Please try again.");
        }
    };



    const handleFilterChange = (value: number) => {
        setFilterLessonNo(value);
        if (value) {
            setFilteredData(vocabularies?.filter((vocab) => vocab.lessonNo === value));
        } else {
            setFilteredData(vocabularies);
        }
    };

    const columns: ColumnType<IVocabulary>[] = [
        {
            title: "Word",
            dataIndex: "word",
            key: "word",
        },
        {
            title: "Meaning",
            dataIndex: "meaning",
            key: "meaning",
            render: (_: unknown, record: IVocabulary) => (
                <span>{record.whenToSay}</span>
            ),
        },
        {
            title: "Pronunciation",
            dataIndex: "pronunciation",
            key: "pronunciation",
        },
        {
            title: "When to Say",
            dataIndex: "whenToSay",
            key: "whenToSay",
        },
        {
            title: "Lesson No",
            dataIndex: "lessonNo",
            key: "lessonNo",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, record: IVocabulary) => {
                const lesson = data?.data?.find((lesson) =>
                    lesson.vocabulary.some((vocab) => vocab._id === record._id)
                );
                const lessonId = lesson?._id as string;

                return (
                    <Space>
                        <Button onClick={() => handleEdit(lessonId, record._id)} type="primary">Update</Button>
                        <Button onClick={() => handleDelete(lessonId, record._id)} type="dashed">Delete</Button>
                    </Space>
                );
            }

        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Select
                    value={filterLessonNo}
                    onChange={handleFilterChange}
                    placeholder="Filter by Lesson No"
                    style={{ width: 200 }}
                >
                    {data?.data?.map((lesson) => (
                        <Option key={lesson._id} value={lesson.LessionNumber}>
                            Lesson {lesson.LessionNumber}
                        </Option>
                    ))}
                </Select>
            </Space>

            <Table
                columns={columns}
                dataSource={filterLessonNo ? filteredData : vocabularies}
                rowKey="_id"
                scroll={{ x: true }}
            />
            <Modal
                title="Update Vocabulary"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText="Update"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdate}
                    initialValues={currentVocabulary ?? undefined}
                >
                    <Form.Item
                        label="Word"
                        name="word"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Pronunciation"
                        name="pronunciation"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="When to Say"
                        name="whenToSay"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Lesson No"
                        name="lessonNo"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default VocabularyManagement;
