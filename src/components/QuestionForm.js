import React, { useState } from 'react';

const NewQuestionForm = ({ onAddQuestion }) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers,
      correctIndex
    };

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion)
    })
      .then(response => response.json())
      .then(data => {
        onAddQuestion(data);
        // Clear form fields
        setPrompt('');
        setAnswers(['', '', '', '']);
        setCorrectIndex(0);
      })
      .catch(error => console.error('Error adding question:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
            required
          />
        </label>
      ))}
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(Number(e.target.value))}
        >
          {answers.map((_, index) => (
            <option key={index} value={index}>
              Answer {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default NewQuestionForm;