import React from 'react'
import StarRating from "./stars";


export default function SingleQuestionForm({ansCheck,selectAns,currentIndex,question,stars,decodedQuestion,questionOptions}) {
  return (
<div>
          <div>
            <h1 className="text-3xl">
              Qestion {currentIndex + 1} of {question}
            </h1>
            <p>Entertainment: Board Games</p>
            <StarRating difficulty={stars} />
          </div>
          <div className="flex justify-center w-30 text-2xl max-w-xl">
            {decodedQuestion}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {questionOptions.map((data, i) => {
              return (
                <button
                  key={i}
                  disabled={selectAns}
                  style={
                     selectAns === data.replace(/%20/g, " ")
                      ? { backgroundColor: "gray", color: "white" }
                      : {}
                  }
                  onClick={(e) => ansCheck(e)}
                  type="button"
                  className={selectAns?"focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 ":"py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"}
                >
                  {data.replace(/%20/g, " ")}
                </button>
              );
            })}
          </div>
        </div>
  )
}
