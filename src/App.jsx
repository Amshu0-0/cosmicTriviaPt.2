import React from "react";
import './App.css';
import Header from "./components/Header";
import { questionList } from "./components/Data";
import { useState } from "react";

const App = () => {
  const [showBack, setShowBack] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleFlip() {
    setShowBack(!showBack);
  }

  function handleNext() {
    if (currentIndex < questionList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    resetCard();
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(questionList.length - 1);
    }
    resetCard();
  }

  function resetCard() {
    setShowBack(false);
    setUserAnswer("");
    setIsCorrect(null);
    setSubmitted(false);
  }

  function handleInputChange(e) {
    setUserAnswer(e.target.value);
  }

  function checkAnswer() {
    const correctAnswer = questionList[currentIndex].answer;
    const isAnswerCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setSubmitted(true);
    setShowBack(true);
  }

  const currentQuestion = questionList[currentIndex];

  return (
    <div className="App">
      <Header />
      <h3>Card {currentIndex + 1} of {questionList.length}</h3>
      
      <div className="card-container">
        <div className="card" onClick={handleFlip}>
          {showBack ? currentQuestion.answer : currentQuestion.question}
        </div>
      </div>
      
      <div className="controls">
        <div className="navigation-buttons">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        
        {!showBack && !submitted && (
          <div className="answer-input">
            <input 
              type="text" 
              value={userAnswer} 
              onChange={handleInputChange} 
              placeholder="Enter your answer"
            />
            <button onClick={checkAnswer}>Submit</button>
          </div>
        )}
        
        {submitted && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;