import questions from "../questions.json";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion"
import Confetti from 'react-confetti'
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [cheating, setcheating] = useState(false)
  const router = useRouter()
  const [confettirecylce, setconfettirecylce] = useState(true)
  const [showScore, setShowScore] = useState(false);
  const [page, setpage] = useState('')
  const [questionAnimate, setQuestionAnimate] = useState(false)
  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };
  const handlePrevious = () => {
    setQuestionAnimate(true)
    setTimeout(()=>{
      setQuestionAnimate(false)
      const prevQues = currentQuestion - 1;
      prevQues >= 0 && setCurrentQuestion(prevQues);
    }, 1000)
  };

  const handleNext = () => {
    setTimeout(() => {
      setQuestionAnimate(true)
      setTimeout(()=>{
        setQuestionAnimate(false)
        const nextQues = currentQuestion + 1;
        nextQues < questions.length && setCurrentQuestion(nextQues);
      }, 500)
    }, 1000)
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true)
    setTimeout(()=>{
      setconfettirecylce(false)
    }, 5000)
  };
  const optionlists = {
    inAnimate: {
      opacity: 1,
      scale: 1,
      transition:{
        duration: 0.7,
        type: 'spring'
      }
    },
    inAnimateIntial:{
      opacity: 0,
      x: 0,
      scale: 0.5
    },
  }
  const animateOut = {
    outAnimate: {
      x: 100,
      transition: {
        duration: 1,
      }
    },
    outAnimateIntial : {
      x: 0,
      scale: 1,
    }
  }
  const container = {
    hidden: { },
    show: {
      
      transition: {
        staggerChildren: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 200 },
    show: { opacity: 1, y: 0 }
  }
  const onBlur = () =>{
    if (showScore == false){
      setcheating(true)
      setShowScore(true)
    }
  }
  useEffect(() => {
    window.addEventListener("blur", onBlur);
    return () => {
        window.removeEventListener("blur", onBlur);
    };
  }, []);
  return (
    <>

<div className={`overflow-hidden transition-all flex ${showScore ? 'bg-indigo-800' : 'bg-[#1A1A1A] '} flex-col w-screen px-5 h-screen lg:justify-center items-center`}>
      <Head>
        <title>Ancient China</title>
      </Head>
      {showScore ? 
        cheating ? (
          <>
          <div className='mb-12 flex justify-center flex-col items-center'>
            <h1 className='text-8xl my-8'>
              😭
            </h1>
            <h1 className='text-white text-5xl font-semibold'>Why did you do this...</h1>
          </div>
          <h1 className="text-2xl font-semibold text-center text-white">
            <div className='flex items-center'>I'm disappointed in you... cheating is bad. but i'll give you a chance to retry the quiz.</div>
          </h1>

          <button onClick={()=> window.location.href = 'https://ace.popplays.tk'} className='mt-8 rounded-lg bg-gray-700 px-4 py-3 text-white text-lg w-96'>Return</button>
          <button onClick={()=> window.location.reload()} className='mt-2 rounded-lg bg-gray-700 px-4 py-3 text-white text-lg w-96'>Retry (without cheating this time)</button>
        </>
        ): <>
          {score / questions.length * 100 >= 75 && 
            <Confetti
            recycle={confettirecylce}
           />
          }
          <div className='mb-12 flex justify-center flex-col items-center'>
            <h1 className='text-8xl my-8'>
              {score / questions.length * 100 >= 75 ? '🥳': score / questions.length * 100 >= 50 ? '💪' : '😢' }
            </h1>
            <h1 className='text-white text-5xl font-semibold'>{score / questions.length * 100 >= 75 ? 'Congrats!': score / questions.length * 100 >= 50 ? 'Good Effort' : 'Better luck next time!' }</h1>
          </div>
          <h1 className="text-3xl font-semibold text-center text-white">
            <div className='flex items-center'>Total Score: <span className={`mx-4 text-4xl ${score / questions.length * 100 >= 75 ? 'text-green-500': score / questions.length * 100 >= 50 ? 'text-yellow-500' : 'text-red-500' }`}>{score}</span> / <span className='ml-3'>{questions.length}</span></div>
          </h1>
          <button onClick={()=> window.location.href = 'https://ace.popplays.tk'} className='mt-8 rounded-lg bg-gray-700 px-4 py-3 text-white text-lg w-96'>Return</button>
          <button onClick={()=> router.push('/answers')} className='mt-2 rounded-lg bg-gray-700 px-4 py-3 text-white text-lg w-96'>View Answers</button>
        </>
      : (
        <>
          <div className="flex flex-col items-start w-full">
            <h4 className="mt-10 text-xl text-white/60">
              Question {currentQuestion + 1} of {questions.length}
            </h4>
            <div className="mt-4 text-2xl text-white">
              {questions[currentQuestion].question}
            </div>
          </div>
          <motion.div variants={questionAnimate ? animateOut : optionlists} initial={questionAnimate ? 'outAnimateIntial' : 'inAnimateIntial'} animate={questionAnimate ? 'outAnimate' : 'inAnimate'} className='w-full'>
          <div className="flex flex-col w-full">
            <motion.div variants={container} initial='hidden' animate='show'>
            {questions[currentQuestion].answerOptions.map((answer, index) => (
              <motion.div variants={item}>
              <div
                key={index}
                className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl ${answer.answer === selectedOptions[currentQuestion]?.answerByUser ? 'bg-indigo-600' : 'bg-white/5'}`}
                onClick={() => {
                    handleAnswerOption(answer.answer);
                    if(currentQuestion + 1 === questions.length){
                      handleSubmitButton()
                    }
                    {
                      handleNext()
                    }
                  }
                }
              >
                <input
                  type="radio"
                  name={answer.answer}
                  value={answer.answer}
                  checked={
                    answer.answer ===
                    selectedOptions[currentQuestion]?.answerByUser
                  }
                  onChange={(e) => handleAnswerOption(answer.answer)}
                  className="hidden w-6 h-6 bg-black"
                />
                <p className="ml-6 text-white">{answer.answer}</p>
              </div>
              </motion.div>
            ))}
            </motion.div>
          </div>
          </motion.div>
          <motion.div className="flex justify-between w-full mt-4 text-white" transition={{staggerChildren: 1}}>
          <div className="flex justify-between w-full mt-4 text-white">
            <motion.div className="w-[49%]" transition={{delay: 0.7}} initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}}>
            <button
              onClick={handlePrevious}
              className={`w-full py-3 ${currentQuestion == 0 || questionAnimate ? 'bg-gray-700 cursor-not-allowed' : 'bg-indigo-600 cursor-pointer'} rounded-lg`}
            >
              Previous
            </button>
            </motion.div>
            <motion.div transition={{delay: 0.7}} className={`w-[49%] py-3 ${questionAnimate ? 'bg-gray-700' : 'bg-indigo-600'} rounded-lg`} initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}}>
            <button
              onClick={
                currentQuestion + 1 === questions.length
                  ? handleSubmitButton
                  : handleNext
              }
              className="w-full"
            >
              {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
            </button>
            </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </div>    
    </>
  );
}
