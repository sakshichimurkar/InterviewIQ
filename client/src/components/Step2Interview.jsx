import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'motion/react'
import { BsArrowRight } from 'react-icons/bs'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import maleVideo from '../assets/Videos/male-ai.mp4'
import femaleVideo from '../assets/Videos/female-ai.mp4'
import { ServerUrl } from '../App'
import Timer from './Timer'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions = [], userName = 'there' } = interviewData || {}
  const [isIntroPhase, setIsIntroPhase] = useState(true)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isAIPlaying, setIsAIPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60)
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [finishError, setFinishError] = useState('')
  const [voiceGender, setVoiceGender] = useState('female')
  const [subtitle, setSubtitle] = useState('')
  const videoRef = useRef(null)
  const recognitionRef = useRef(null)
  const currentQuestion = questions[currentIndex]
  const videoSource = voiceGender === 'male' ? maleVideo : femaleVideo

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis?.getVoices?.() || []
      if (!voices.length) return
      const femaleVoice = voices.find((voice) => /zira|samantha|female/i.test(voice.name))
      const maleVoice = voices.find((voice) => /david|mark|male/i.test(voice.name))
      const voice = femaleVoice || maleVoice || voices[0]
      setSelectedVoice(voice)
      setVoiceGender(femaleVoice ? 'female' : maleVoice ? 'male' : 'female')
    }
    loadVoices()
    if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = loadVoices
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true
    recognition.interimResults = false
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
      setAnswer((previous) => `${previous} ${transcript}`.trim())
    }
    recognition.onend = () => setIsMicOn(false)
    recognitionRef.current = recognition
    return () => recognition.stop()
  }, [])

  const stopMic = useCallback(() => {
    recognitionRef.current?.stop()
    setIsMicOn(false)
  }, [])

  const startMic = () => {
    if (!recognitionRef.current || isAIPlaying) return
    try {
      recognitionRef.current.start()
      setIsMicOn(true)
    } catch {
      setIsMicOn(false)
    }
  }

  const speakText = useCallback((text) => new Promise((resolve) => {
    if (!window.speechSynthesis || !selectedVoice) {
      resolve()
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text.replace(/,/g, ', ... ').replace(/\./g, '. ... '))
    utterance.voice = selectedVoice
    utterance.rate = 0.92
    utterance.pitch = 1.05
    utterance.onstart = () => {
      setIsAIPlaying(true)
      stopMic()
      videoRef.current?.play()
    }
    utterance.onend = () => {
      videoRef.current?.pause()
      if (videoRef.current) videoRef.current.currentTime = 0
      setIsAIPlaying(false)
      setTimeout(() => {
        setSubtitle('')
        resolve()
      }, 300)
    }
    utterance.onerror = () => {
      setIsAIPlaying(false)
      resolve()
    }
    setSubtitle(text)
    window.speechSynthesis.speak(utterance)
  }), [selectedVoice, stopMic])

  useEffect(() => {
    if (!selectedVoice || !currentQuestion) return
    const introduce = async () => {
      if (isIntroPhase) {
        await speakText(`Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`)
        await speakText("I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.")
        setIsIntroPhase(false)
      } else {
        await speakText(currentQuestion.question)
      }
    }
    introduce()
  }, [selectedVoice, isIntroPhase, currentIndex, currentQuestion, speakText, userName])

  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return
    const resetQuestion = window.setTimeout(() => {
      setTimeLeft(currentQuestion.timeLimit || 60)
      setAnswer('')
      setFeedback('')
    }, 0)
    return () => window.clearTimeout(resetQuestion)
  }, [currentQuestion, isIntroPhase])

  useEffect(() => {
    if (isIntroPhase || !currentQuestion || timeLeft <= 0) return undefined
    const timer = window.setInterval(() => setTimeLeft((time) => Math.max(time - 1, 0)), 1000)
    return () => window.clearInterval(timer)
  }, [currentIndex, isIntroPhase, currentQuestion, timeLeft])

  const submitAnswer = async () => {
    if (isSubmitting || !answer.trim()) {
      setFeedback(answer.trim() ? '' : 'Please type an answer before submitting.')
      return
    }
    stopMic()
    setIsSubmitting(true)
    try {
      const result = await axios.post(`${ServerUrl}/api/interview/submit-answer`, { interviewId, questionIndex: currentIndex, answer, timeTaken: (currentQuestion?.timeLimit || 60) - timeLeft }, { withCredentials: true })
      setFeedback(result.data.feedback || 'Answer submitted.')
      await speakText(result.data.feedback || 'Answer submitted.')
    } catch (error) {
      setFeedback(error.response?.data?.message || 'Unable to submit this answer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const finishInterview = async () => {
    stopMic()
    setFinishError('')
    try {
      const result = await axios.post(`${ServerUrl}/api/interview/finish`, { interviewId }, { withCredentials: true })
      onFinish(result.data)
    } catch (error) {
      setFinishError(error.response?.data?.message || 'Unable to finish the interview.')
    }
  }

  const handleNext = async () => {
    setAnswer('')
    setFeedback('')
    if (currentIndex + 1 >= questions.length) {
      await finishInterview()
      return
    }
    setCurrentIndex((index) => index + 1)
  }

  if (!interviewData || !questions.length) return <div className='flex min-h-screen items-center justify-center'>No interview started yet.</div>

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-6xl min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>
        <div className='w-full lg:w-[35%] flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'><video src={videoSource} key={videoSource} ref={videoRef} className='w-full h-auto object-cover' autoPlay muted loop playsInline /></div>
          {subtitle && <div className='w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm text-center text-gray-700'>{subtitle}</div>}
          <div className='w-full max-w-md border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
            <div className='flex justify-between'><span className='text-sm text-gray-500'>Interview Status</span>{isAIPlaying && <span className='text-sm font-semibold text-emerald-600'>AI Speaking</span>}</div>
            <div className='h-px bg-gray-200' />
            <div className='flex justify-center'><Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60} /></div>
            <div className='h-px bg-gray-200' />
            <div className='grid grid-cols-2 gap-6 text-center'><div><span className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</span><span className='text-xs text-gray-400 block'>Current Question</span></div><div><span className='text-2xl font-bold text-emerald-600'>{questions.length}</span><span className='text-xs text-gray-400 block'>Total Questions</span></div></div>
          </div>
        </div>
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 m-6'>AI Smart Interview</h2>
          {!isIntroPhase && <div className='relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'><p className='text-xs sm:text-sm text-gray-400 mb-2'>Question {currentIndex + 1} of {questions.length}</p><div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'>{currentQuestion?.question}</div></div>}
          <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder='Type your answer here...' className='flex-1 min-h-48 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800' />
          {finishError && <p className='mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700'>{finishError}</p>}
          {feedback ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl'><p className='text-emerald-700 font-medium mb-4'>{feedback}</p><button onClick={handleNext} className='w-full bg-emerald-600 text-white py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-1'>Next Question <BsArrowRight size={18} /></button></motion.div> : <div className='flex items-center gap-4 mt-6'><motion.button onClick={() => (isMicOn ? stopMic() : startMic())} whileTap={{ scale: 0.9 }} className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg'>{isMicOn ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}</motion.button><motion.button onClick={submitAnswer} disabled={isSubmitting} whileTap={{ scale: 0.95 }} className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:opacity-60'>{isSubmitting ? 'Submitting...' : 'Submit Answer'}</motion.button></div>}
        </div>
      </div>
    </div>
  )
}

export default Step2Interview
