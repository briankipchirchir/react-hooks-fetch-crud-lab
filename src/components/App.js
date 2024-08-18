import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);
  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted question from the state
        setQuestions(questions.filter(question => question.id !== id));
      })
      .catch(error => console.error('Error deleting question:', error));
  };
  const handleUpdateCorrectIndex = (id, newIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex: newIndex })
    })
      .then(response => response.json())
      .then(updatedQuestion => {
        // Update the question in the state
        setQuestions(questions.map(question =>
          question.id === id ? updatedQuestion : question
        ));
      })
      .catch(error => console.error('Error updating correct index:', error));
  };


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateCorrectIndex={handleUpdateCorrectIndex}/>}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'New Question'}
      </button>
    </main>
  );
}

export default App;
