import { useGetAllTutorialQuery } from "../../redux/feature/Endpoints/EndPoint";


const Tutorials = () => {

    const {data} = useGetAllTutorialQuery({})

    return (
        <div>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Japanese Language Learning Videos</h2>
                <div className="grid lg:ml-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.data?.map((videoUrl, index) => (
                        <div key={index} className="rounded overflow-hidden ">
                            <div className="relative aspect-w-16 aspect-h-9">
                                <iframe
                                    src={videoUrl?.Link}
                                    title={`Video ${index + 1}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    width="420" height="345" 
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tutorials;