import { Router, useRouter } from "next/router";
import { useState } from "react";
import questions from "../questions.json";


export default function Answers(){
    const [questionNumber, setquestionNumber] = useState(0)
    const router = useRouter()
    return(
        <>
        <div className='h-full w-full bg-[#1A1A1A] px-5 py-10'>
            <h1 className='text-5xl text-indigo-500 font-semibold'>Answers</h1>
        {questions.map((question, index) => {
            return(
                <>
                <div className="py-10 flex flex-col items-start w-full">
                    <h4 className="mt-10 text-xl text-white/60">
                    Question {index + 1} of {questions.length}
                    </h4>
                    <div className="mt-4 text-2xl text-white">
                    {question.question}
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    {question.answerOptions.map((answer, index) => (
                    <div
                        key={index}
                        className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-default border-white/10 rounded-xl ${answer.isCorrect ? 'bg-indigo-600' : 'bg-white/5'}`}
                    >
                        <input
                        type="radio"
                        name={answer.answer}
                        value={answer.answer}
                        checked={
                            answer.isCorrect
                        }
                        className="hidden w-6 h-6 bg-black"
                        />
                        <p className="ml-6 text-white">{answer.answer}</p>
                    </div>
                    ))}
                </div>
                </>
            )
        })}
        <button onClick={()=> router.push('/') } className='mx-4 mt-10 w-44 bg-indigo-600 py-3 px-4 rounded-lg text-white'>
            Retry Quiz
        </button>

        <button onClick={()=> window.location.href = 'https://ace.popplays.tk'} className='mx-4 mt-10 w-44 bg-gray-700 py-3 px-4 rounded-lg text-white'>
            Return to site
        </button>
        </div>
        </>
    )
}