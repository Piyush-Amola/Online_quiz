"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { usePoints } from "@/context/PointsContext";
import QuestionTimer from "@/components/QuestionTimer";
import Results from "@/components/Results";

const Quiz = ({ params }) => {
  const unwrappedParams = use(params);
  const { subject } = unwrappedParams;
  const { points, setPoints } = usePoints();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/data/questions.json");
        if (response.ok) {
          const data = await response.json();

          const subjectData = data.subjects.find(
            (s) => s.name.toLowerCase().trim() === subject.toLowerCase().trim()
          );

          setQuestions(subjectData ? subjectData.questions : []);
        } else {
          console.error("Failed to fetch questions. Status:", response.status);
          alert("Failed to load quiz questions. Please try again later.");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        alert("An error occurred while fetching questions. Please try again.");
      }
    };

    fetchQuestions();
  }, [subject]);

  // Handle answer selection
  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestionIndex]?.answer) {
      setPoints(points + 5);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setPoints(points - 3);
      setWrongAnswers((prev) => prev + 1);
    }
  };

  // Handle "Next" button click or timer expiry
  const handleNext = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true); // Mark quiz as completed
      setShowResults(true); // Show results
    }
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setUnattemptedQuestions((prev) => prev + 1);
    handleNext();
  };

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true); 
  };

  // Calculate percentage and average time per question
  const percentage = Math.round((correctAnswers / questions.length) * 100);
  const averageTimePerQuestion = (totalTimeSpent / questions.length).toFixed(2);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen flex justify-center items-center">
      {!quizStarted ? (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-2xl p-6 relative">
          <h2 className="text-4xl font-semibold mb-4 text-blue-700">
            Welcome to the Quiz!
          </h2>
          <button
            onClick={startQuiz}
            className="mt-8 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition border rounded-full shadow-md"
          >
            Start Quiz
          </button>
        </div>
      ) : !showResults ? (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-2xl p-6 relative">
          <QuestionTimer
            onTimeUp={handleTimeUp}
            isAnswered={isAnswered}
            setTotalTimeSpent={setTotalTimeSpent}
            totalTimeSpent={totalTimeSpent}
            resetTimer={currentQuestionIndex}
            quizCompleted={quizCompleted}
          />

          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 transition-all duration-500 border rounded-full"
            style={{
              width:
                questions.length > 0
                  ? `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  : "0%",
            }}
          ></div>
          <h2 className="text-4xl font-semibold text-center mb-4 text-blue-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <h3 className="text-3xl font-bold text-center mb-6 p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl shadow-lg">
            {questions[currentQuestionIndex]?.question || "Loading..."}
          </h3>
          <div className="mt-6 space-y-5">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition duration-300 focus:outline-none transform ${
                  isAnswered &&
                  option === questions[currentQuestionIndex]?.answer
                    ? "bg-green-500 text-white border-4 border-green-600 scale-105"
                    : isAnswered && option === selectedOption
                    ? "bg-red-500 text-white border-4 border-red-600 scale-105"
                    : "bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 border rounded-full"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-8 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition border rounded-full shadow-md"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Submit"
                : "Next Question"}
            </button>
          )}
        </div>
      ) : (
        <Results
          score={points}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          unattemptedQuestions={unattemptedQuestions}
          percentage={percentage}
          timeSpent={totalTimeSpent}
          averageTimePerQuestion={averageTimePerQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;
