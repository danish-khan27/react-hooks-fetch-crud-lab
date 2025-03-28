function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChangeCorrectAnswer(e) {
    const newIndex = parseInt(e.target.value);
  
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => res.json())
      .then((updatedQ) => {
        console.log("Updated question:", updatedQ);
        if (onUpdate) onUpdate(updatedQ);
      });
  }
  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
  value={question.correctIndex}
  onChange={handleChangeCorrectAnswer}
>
  {options}
</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}
export default QuestionItem; 
