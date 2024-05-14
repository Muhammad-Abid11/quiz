"use client";
import SingleQuestionForm from "./component/SingleQuestionForm";
import "./style.css";
import question from "./questions.json";
import { useEffect, useState } from "react";
import Progress from "./component/progress";
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [selectAns, setSelectAns] = useState("");
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [isCorrect, setCorrect] = useState(null);
  const [isAnsCorrect, setIsAnsCorrect] = useState(false);
  const renderQuestion = question[currentIndex];
  const isLastQuestion = currentIndex === question.length;

  useEffect(() => {
    const arr = [
      question[currentIndex].correct_answer,
      ...question[currentIndex].incorrect_answers,
    ];
    const shuffledOptions = shuffle(arr);
    setQuestionOptions(shuffledOptions);

    const difficulty = renderQuestion.difficulty;
    const stars = difficulty === "easy" ? 1 : difficulty === "hard" ? 3 : 2;
    setStars(stars);
  }, []);

  const next = () => {
    isAnsCorrect && setScore(score + 1);
    setSelectAns("");

    setCurrentIndex(currentIndex + 1);
    const arr = [
      question[currentIndex + 1]?.correct_answer,
      ...question[currentIndex + 1]?.incorrect_answers,
    ];
    const shuffledOptions = shuffle(arr);
    setQuestionOptions(shuffledOptions);

    const difficulty = question[currentIndex + 1].difficulty;
    const stars = difficulty === "easy" ? 1 : difficulty === "hard" ? 5 : 3;
    setStars(stars);
  };

  const shuffle = (array) => {
    let currentIndes = array.length;
    let randomIndex;
    while (currentIndes > 0) {
      randomIndex = Math.floor(Math.random() * currentIndes);
      currentIndes--;
      [array[currentIndes], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndes],
      ];
    }
    return array;
  };
  
  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectAns("");
    setCorrect(null);
  };

  const ansCheck = (e) => {
    setSelectAns(e.target.innerText);

    if (
      e.target.innerText ==
      question[currentIndex].correct_answer.replace(/%20/g, " ")
    ) {
      // setScore(score + 1);
      setIsAnsCorrect(true);
      setCorrect(true);
      if (currentIndex == question.length - 1) {
        setScore(score + 1);
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setIsAnsCorrect(false);
      setCorrect(false);
    }
  };

  const decodedQuestion = decodeURIComponent(renderQuestion?.question);
  const remainScore = question.length - currentIndex;
  const maxScore = ((remainScore + score) * 100) / question.length;
  const minScore = score !== 0 ? (score / question.length) * 100 : 0;
  const userScore = score != 0 ? ((score / currentIndex) * 100).toFixed() : 0;
  return (
    <div className="cont">
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-success">
        <div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${((currentIndex + 1) * 100) / question.length}%`,
              }}
            ></div>
          </div>
          {!isLastQuestion ? (
            <SingleQuestionForm
              ansCheck={ansCheck}
              selectAns={selectAns}
              questionOptions={questionOptions}
              currentIndex={currentIndex}
              question={question.length}
              stars={stars}
              decodedQuestion={decodedQuestion}
            />
          ) : (
            <div className="end">
              <h1 className="lg:text-3xl">Thank You!</h1>
            </div>
          )}

          <div>
            {isLastQuestion ? (
              <div className="flex flex-col items-center m-3">
                <button
                  onClick={restart}
                  className="mt-4 py-2 px-4 bg-gray-200 text-black font-semibold rounded-lg shadow-md hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Restart
                </button>
              </div>
            ) : (
              selectAns && (
                <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center">
                    {isCorrect ? (
                      <h1 className="lg:text-3xl">Correct</h1>
                    ) : (
                      <h1 className="lg:text-3xl">Sorry!</h1>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={next}
                      className="mt-4 py-2 px-4 bg-gray-200 text-black font-semibold rounded-lg shadow-md hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
          <br />
          <div className="prog">
            <div className="progres1">
              <p class="text-yellow-700 font-semibold flex justify-center">Score {userScore}</p>
              <Progress score={userScore} color={"yellow"} />
            </div>
            <div className="progres2">
              <p className="text-green-500 font-semibold flex justify-end">
                Max Score {maxScore}
              </p>
              <Progress score={maxScore} color={"green"} />
            </div>
            <div className="progres3">
              <p className="text-red-700 font-semibold  ">
                Min Score {minScore}
              </p>
              <Progress score={minScore} color={"red"} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
