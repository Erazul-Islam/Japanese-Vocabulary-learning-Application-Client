import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllLessonsQuery } from "../../redux/feature/Endpoints/EndPoint";
import { TLession } from "../../utils/global";
import Confetti from "react-confetti";

const LessonDetail = () => {

    const { id } = useParams()
    const { data } = useGetAllLessonsQuery({})
    const [lesson, setLesson] = useState<TLession>()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const findLesson = data?.data?.find((lesson: { _id: string | undefined; }) => lesson._id === id)
        setLesson(findLesson)
    }, [id, data])

    const vocabulary = lesson?.vocabulary
    const handleNext = () => {
        if (vocabulary && currentIndex < vocabulary.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const playPronunciation = (text: string) => {
        const speech = new SpeechSynthesisUtterance(text)
        speech.lang = 'ja-JP';
        window.speechSynthesis.speak(speech)
    }

    const handleComplete = () => {
        setShowConfetti(true)
        setTimeout(() => {
            setShowConfetti(false)
            navigate('/lessions')
        }, 5000)
    }

    return (
        <div>
            <div className="mt-16 mb-16">
                <h2 className="text-2xl font-bold text-center mb-6">{lesson?.LessionName} - Vocabulary</h2>
                {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
                {vocabulary && vocabulary.length > 0 ? (
                    <div className="flex flex-col mt-8 items-center gap-6">
                        <div className="text-center">
                            <h3
                                onClick={() => playPronunciation(vocabulary[currentIndex]?.word)}
                                className="text-4xl font-semibold text-blue-500 cursor-pointer hover:underline"
                            >
                                {vocabulary[currentIndex]?.word}
                            </h3>
                            <p className="text-gray-600 mt-2">
                                Click the word to hear its pronunciation!
                            </p>
                        </div>

                        <div className="text-lg text-center bg-gray-100 p-4 rounded shadow-md max-w-xl">
                            <p><strong>Pronunciation:</strong> {vocabulary[currentIndex]?.pronunciation}</p>
                            <p><strong>When to Say:</strong> {vocabulary[currentIndex]?.whenToSay}</p>
                            <p><strong>Lesson Number:</strong> {vocabulary[currentIndex]?.lessonNo}</p>
                        </div>
                        {currentIndex < vocabulary.length - 1 ? (
                            <div className="flex gap-4">
                                <button
                                    disabled={currentIndex === 0}
                                    onClick={handlePrevious}
                                    className={`px-6 py-2 rounded ${currentIndex === 0 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Next
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleComplete}
                                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Complete
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="text-center h-screen text-gray-500">No vocabulary available for this lesson.</p>
                )}
            </div>
        </div>
    );
};

export default LessonDetail;