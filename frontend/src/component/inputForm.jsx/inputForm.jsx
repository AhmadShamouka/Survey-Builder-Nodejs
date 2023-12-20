import React, { useState } from "react";

const InputForm = () => {
  const [question, setQuestion] = useState("");

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User Question:", question);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            name="question"
            onChange={handleChange}
            placeholder="Type your Question here"
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {question && (
        <div>
          <p>You entered: {question}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
