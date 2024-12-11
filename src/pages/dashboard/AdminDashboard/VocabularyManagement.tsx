import { useState } from "react";
import { Table, Button, Space, Select, message } from "antd";
import { useDeleteVocabularyMutation, useGetAllLessonsQuery } from "../../../redux/feature/Endpoints/EndPoint";
import Swal from "sweetalert2";

const { Option } = Select;

const VocabularyManagement = () => {
    const { data, refetch } = useGetAllLessonsQuery(null);
    const [filteredData, setFilteredData] = useState([]);
    const [filterLessonNo, setFilterLessonNo] = useState(null);
    const [deleteVocabulary] = useDeleteVocabularyMutation()


    const vocabularies = data?.data?.map(lesson => ({
        lessonId: lesson._id,
        vocabulary: lesson.vocabulary,
    })).flatMap(lesson => lesson.vocabulary) || [];

    const handleDelete = (id: string, vocabularyId: string) => {
        console.log("lessonid", id)
        console.log("vocabulary", vocabularyId)
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

    const handleUpdate = (id: string) => {
        console.log("Update Vocabulary ID: ", id);
    };

    // Filter data based on selected LessonNo
    const handleFilterChange = (value) => {
        setFilterLessonNo(value);
        if (value) {
            setFilteredData(vocabularies?.filter((vocab) => vocab.lessonNo === value));
        } else {
            setFilteredData(vocabularies);
        }
    };

    // Define columns for the table
    const columns = [
        {
            title: "Word",
            dataIndex: "word",
            key: "word",
        },
        {
            title: "Meaning",
            dataIndex: "meaning",
            key: "meaning",
            render: (_, record) => (
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
            render: (_, record) => {
                // Find the corresponding lessonId for this vocabulary
                const lesson = data?.data?.find((lesson) =>
                    lesson.vocabulary.some((vocab) => vocab._id === record._id)
                );
                const lessonId = lesson?._id;

                return (
                    <Space>
                        <Button onClick={() => handleUpdate(record._id)} type="primary">Update</Button>
                        <Button onClick={() => handleDelete(lessonId, record._id)} type="primary">Delete</Button>
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
        </div>
    );
};

export default VocabularyManagement;
