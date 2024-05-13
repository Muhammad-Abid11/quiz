"use client";
import Image from "next/image";
import question from "./questions.json";
import { useEffect, useState } from "react";
import StarRating from "./component/stars";
export default function Home() {
  const [questions, setQuestion] = useState(question);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [selectAns, setSelectAns] = useState("");
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [isCorrect, setCorrect] = useState(null);

  const renderQuestion = question[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  console.log("stars", stars);
  useEffect(() => {
    const arr = [
      questions[currentIndex].correct_answer,
      ...questions[currentIndex].incorrect_answers,
    ];
    const shuffledOptions = shuffle(arr);
    setQuestionOptions(shuffledOptions);

    const difficulty = renderQuestion.difficulty;
    const stars = difficulty === "easy" ? 1 : difficulty === "hard" ? 5 : 3;
    setStars(stars);

  }, []);

  const next = () => {
    setSelectAns("");

    setCurrentIndex(currentIndex + 1);
    const arr = [
      questions[currentIndex + 1].correct_answer,
      ...questions[currentIndex + 1].incorrect_answers,
    ];
    const shuffledOptions = shuffle(arr);
    setQuestionOptions(shuffledOptions);
    
    const difficulty = question[currentIndex+1].difficulty;
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
    // console.log("hi",e.target.innerText)
    setSelectAns(e.target.innerText);
    if (e.target.innerText == questions[currentIndex].correct_answer) {
      setScore(score + 1);
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  console.log("scoree",score)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-success">
      <div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: `${((currentIndex + 1) * 100) / questions.length}%`,
            }}
          ></div>
        </div>

        <div>
          <h1>
            Qestion {currentIndex + 1} of {question.length}
          </h1>
          <p>Entertainment: Board Games</p>
          <StarRating difficulty={stars} />
        </div>
        <div className="flex justify-center w-30">
          {renderQuestion.question.replace(/%20/g, " ")}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ul>
            {questionOptions.map((data, i) => {
              return (
                <li key={i}>
                  <button
                    disabled={selectAns}
                    style={
                      selectAns === data
                        ? { backgroundColor: "gray", color: "white" }
                        : {}
                    }
                    onClick={(e) => ansCheck(e)}
                    type="button"
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 
                focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 
                hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 
                dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                dark:hover:bg-gray-700"
                  >
                    {data}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {}

          {isLastQuestion ? (
            <button onClick={restart}>Restart</button>
          ) : (
            selectAns && (
              <div>
                {isCorrect ? <h1>Correct</h1> : <h1>InCorrect</h1>}
                <button onClick={next}>Next</button>
              </div>
            )
          )}
        </div>

        
        <div className="flex">
      <div className="flex-grow bg-green-500" role="progressbar" style={{ width: `${(score/currentIndex) * 10}%` }}>
       Score {(score/(currentIndex+1).toFixed())*10}
      </div>
      <div className="flex-grow bg-yellow-500" role="progressbar" style={{ width: `${score/questions.length * 10}%` }}>
        Maximum {(score/questions.length)*10}
      </div>
      <div className="flex-grow bg-red-500" role="progressbar" style={{ width: `${currentIndex/questions.length * 10}%` }}>
         {(currentIndex/questions.length)*10}
      </div>
    </div>

        
      </div>
    </main>
  );
}
