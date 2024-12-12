

const Tutorials = () => {

    const videoList = [
        "https://www.youtube.com/embed/EK4YZPd7XE8?si=sO7TML4048HBFioh",
        "https://www.youtube.com/embed/K94rFS1Mcio?si=mwdzGNExQremCKR0", 
        "https://www.youtube.com/embed/FCtHKQk2Dc0?si=60ABT5rRNwtQstED",
        "https://www.youtube.com/embed/5OltN6NJy88?si=P057dS5xhhoVWCtG", 
        "https://www.youtube.com/embed/B6691z2dE40?si=pNXmQr3aX0F78t0W", 
        "https://www.youtube.com/embed/s6B8ZWr2xZE?si=exSl4pnm1FhmNpk7", 
        "https://www.youtube.com/embed/IbPun-eHN-A?si=ZVUN5nXv04kA-YCX",
        "https://www.youtube.com/embed/7_b17c9K950?si=mTcwEknaUGbLDkMI",
        "https://www.youtube.com/embed/rox2J1Mr8uM?si=KmN0f6KtD0yGy5um",
    ];

    return (
        <div>
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Japanese Language Learning Videos</h2>
                <div className="grid lg:ml-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoList.map((videoUrl, index) => (
                        <div key={index} className="rounded overflow-hidden ">
                            <div className="relative aspect-w-16 aspect-h-9">
                                <iframe
                                    src={videoUrl}
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