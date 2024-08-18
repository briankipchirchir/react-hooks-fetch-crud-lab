import React from 'react';

const QuestionList = ({ questions, onDeleteQuestion, onUpdateCorrectIndex }) => {
  const handleCorrectIndexChange = (id, newIndex) => {
    onUpdateCorrectIndex(id, newIndex);
  };

  return (
    <div>
      <h2>Question List</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <p><strong>Question:</strong> {question.prompt}</p>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>
                  {answer} {index === question.correctIndex && <strong>(Correct)</strong>}
                </li>
              ))}
            </ul>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => handleCorrectIndexChange(question.id, Number(e.target.value))}
              >
                {question.answers.map((_, index) => (
                  <option key={index} value={index}>
                    Answer {index + 1}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => onDeleteQuestion(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;

