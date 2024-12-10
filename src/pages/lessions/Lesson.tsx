import { useGetAllLessonsQuery } from "../../redux/feature/Endpoints/EndPoint";

const Lesson = () => {

    const {data} = useGetAllLessonsQuery(null)
    console.log(data)

    return (
        <div>
            This is Lessions
        </div>
    );
};

export default Lesson;