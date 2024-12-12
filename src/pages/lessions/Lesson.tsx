import { Card } from "antd";
import { useGetAllLessonsQuery } from "../../redux/feature/Endpoints/EndPoint";
import { TLession } from "../../utils/global";
import { Link } from "react-router-dom";

const Lesson = () => {

    const { data } = useGetAllLessonsQuery(null)


    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:ml-40">
                {data?.data?.map((one: TLession) => (<div key={one._id}>
                    <Link to={`/lessions/${one._id}`}>
                        <Card style={{ width: 300,marginTop : 20 }}>
                            <p>{one?.LessionName}</p>
                            <p>{one?.LessionNumber}</p>
                            <p>Card content</p>
                        </Card>
                    </Link>
                </div>))}
            </div>
        </div>
    );
};

export default Lesson;