import React from 'react'
import arrow from '../assets/images/arrow-down.png'
import { useState } from 'react';

const QuestionFaq = props => {

    const [answerClick, setAnswerClick] = useState(false);
    const [answerDisplay, setAnswerDisplay] = useState('hidden');
    const [rotateArrow, setRotateArrow] = useState(null);


    const toggleAnswer = () => {
        if (!answerClick) {
            setAnswerClick(true)
            setRotateArrow('rotate-180')
            setAnswerDisplay('block')
        } else {
            setAnswerClick(false)
            setRotateArrow(null)
            setAnswerDisplay('hidden')
        }
    }

    return (
        <div className='border-solid border-2 bish-border-gray py-3 px-6 rounded-xl bish-bg-white transition-all duration-500 hover:bish-border-blue'>
            <button className='flex justify-between w-full' onClick={() => toggleAnswer()}>
                <span className='font-medium my-auto'>{props.question}</span>
                <img src={arrow} alt="Dérouler la réponse" className={`${rotateArrow} h-8`} />
            </button>
            <span className={`${answerDisplay} mt-3`}>{props.answer}</span>
        </div>
    )
}

export default QuestionFaq