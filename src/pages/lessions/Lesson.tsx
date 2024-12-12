import { Card } from "antd";
import { useGetAllLessonsQuery } from "../../redux/feature/Endpoints/EndPoint";
import { TLession } from "../../utils/global";
import { Link } from "react-router-dom";

const Lesson = () => {

    const { data } = useGetAllLessonsQuery(null)


    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:ml-52 ml-20">
                {data?.data?.map((one: TLession) => (<div key={one._id}>
                    <Link to={`/lessions/${one._id}`}>
                        <Card style={{ width: 300,marginTop : 20,height : 100,marginBottom : 20 }}>
                            <p className="text-center font-bold text-xl">{one?.LessionName}</p>
                            <p className="text-center font-semibold">Lesson Number : {one?.LessionNumber}</p>
                        </Card>
                    </Link>
                </div>))}
            </div>
        </div>
    );
};

export default Lesson;