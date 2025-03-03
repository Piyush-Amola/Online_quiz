// "use client";
// import { useState, useEffect } from "react";

// const QuestionTimer = ({ onTimeUp, setTimePerQuestion, isAnswered, resetTimer }) => {
//   const [seconds, setSeconds] = useState(10);

//   useEffect(() => {
//     if (!isAnswered && seconds > 0) {
//       const timer = setTimeout(() => {
//         setSeconds((prev) => prev - 1);
//         setTimePerQuestion(10 - seconds);
//       }, 1000);
//       return () => clearTimeout(timer);
//     } else if (seconds === 0 && !isAnswered) {
//       onTimeUp();
//     }
//   }, [seconds, isAnswered]);

//   useEffect(() => {
//     setSeconds(10);
//   }, [resetTimer]);

//   return <div className="text-lg">Time Left: {seconds}s</div>;
// };

// export default QuestionTimer;

// "use client";

// import { useEffect, useState } from "react";

// const QuestionTimer = ({
//   onTimeUp,
//   isAnswered,
//   setTotalTimeSpent,
//   totalTimeSpent,
//   resetTimer,
// }) => {
//   const totalQuizTime = 10 * 60;
//   const [seconds, setSeconds] = useState(0);
//   const [quizTime, setQuizTime] = useState(totalTimeSpent);

//   useEffect(() => {
//     if (isAnswered) return;

//     if (seconds < totalQuizTime) {
//       const timer = setTimeout(() => {
//         setSeconds((prev) => prev + 1);
//         setTotalTimeSpent((prev) => prev + 1);
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [seconds, isAnswered, setTotalTimeSpent]);

//   useEffect(() => {
//     setQuizTime(totalTimeSpent);
//   }, [totalTimeSpent]);

//   useEffect(() => {
//     if (totalTimeSpent >= totalQuizTime) {
//       onTimeUp();
//     }
//   }, [totalTimeSpent, onTimeUp]);

//   return (
//     <div className="text-lg">
//       {totalTimeSpent >= totalQuizTime ? (
//         <div>
//           Quiz Finished! Total Time: {Math.floor(quizTime / 60)} m{" "}
//           {quizTime % 60} s
//         </div>
//       ) : (
//         <div>
//           Time Left: {Math.floor((totalQuizTime - totalTimeSpent) / 60)} m{" "}
//           {(totalQuizTime - totalTimeSpent) % 60} s
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionTimer;

"use client";

import { useEffect, useState } from "react";

const QuestionTimer = ({
  onTimeUp,
  isAnswered,
  setTotalTimeSpent,
  totalTimeSpent,
  resetTimer,
  quizCompleted, // Receive quizCompleted state
}) => {
  const totalQuizTime = 10 * 60; // Total quiz time in seconds
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (quizCompleted) return; // Stop timer when quiz is completed

    if (seconds < totalQuizTime) {
      const timer = setTimeout(() => {
        setSeconds((prev) => prev + 1);
        setTotalTimeSpent((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds, quizCompleted, setTotalTimeSpent, totalQuizTime]);

  useEffect(() => {
    if (totalTimeSpent >= totalQuizTime) {
      onTimeUp();
    }
  }, [totalTimeSpent, totalQuizTime, onTimeUp]);

  return (
    <div className="text-lg">
      {totalTimeSpent >= totalQuizTime ? (
        <div>
          Quiz Finished! Total Time: {Math.floor(seconds / 60)} m {seconds % 60}{" "}
          s
        </div>
      ) : (
        <div>
          Time Left: {Math.floor((totalQuizTime - totalTimeSpent) / 60)} m{" "}
          {(totalQuizTime - totalTimeSpent) % 60} s
        </div>
      )}
    </div>
  );
};

export default QuestionTimer;
