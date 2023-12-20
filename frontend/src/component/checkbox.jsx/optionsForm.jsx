import React, { useState } from "react";

const OptionForm = () => {
  const [check, setCheck] = useState();

  const handleChange = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User check:", check);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            name="question"
            onChange={handleChange}
            placeholder="Type your check here"
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            onChange={handleChange}
            placeholder="Type your Answer"
          />
        </label>

        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            onChange={handleChange}
            placeholder="Type your Answer"
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            onChange={handleChange}
            placeholder="Type your Answer"
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OptionForm;
