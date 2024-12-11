import { Card } from "antd";
import { useGetAllLessonsQuery } from "../../redux/feature/Endpoints/EndPoint";

const Lesson = () => {

    const { data } = useGetAllLessonsQuery(null)


    return (
        <div>
            {
                data?.data?.map((one) => (<div key={one._id}>

                    <Card style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>

                </div>))
            }
        </div>
    );
};

export default Lesson;