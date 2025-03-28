import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";



function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const questionItems = questions.map((q) => (
    <QuestionItem key={q.id} question={q} onDelete={handleDelete} onUpdate={handleUpdate} />
  ));

  // Handle delete (see next step)
  function handleDelete(deletedId) {
    const updated = questions.filter(q => q.id !== deletedId);
    setQuestions(updated);
  }

  // Handle update (see step 4)
  function handleUpdate(updatedQuestion) {
    const updated = questions.map(q =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
