// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// const Survey = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const authorization = "Bearer " + location.state?.data;
//   const [check, setCheck] = useState({});
//   const handleChange = (e) => {
//     setCheck({ ...check, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("check");
//     console.log(check);
//     const sendData = {
//       title: check.title,
//       questions: [
//         {
//           questionName: check.questionName,
//           questionType: check.questionType,
//           answers: [
//             { answerText: check.answerText1, answerType: check.answerType1 },
//             { answerText: check.answerText2, answerType: check.answerType2 },
//             { answerText: check.answerText3, answerType: check.answerType3 },
//           ],
//         },
//       ],
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/survey/new",
//         sendData,
//         {
//           headers: {
//             Authorization: authorization,
//           },
//         }
//       );
//       console.log(response.data);
//       navigate(`/get`);
//     } catch (error) {
//       console.error("Error during form submission:", error);
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Survey Title:
//           <input
//             type="text"
//             name="title"
//             onChange={handleChange}
//             placeholder="Type your Survey title here"
//           />
//         </label>

//         <label>
//           Question:
//           <input
//             type="text"
//             name="questionName"
//             onChange={handleChange}
//             placeholder="Type your question here"
//           />
//         </label>

//         <label>
//           Select Form Type:
//           <select name="questionType" onChange={handleChange}>
//             <option value="" disabled>
//               Select...
//             </option>
//             <option value="radio">Radio Form</option>
//             <option value="checkbox">Checkbox Form</option>
//             <option value="input">Input Form</option>
//           </select>
//         </label>

//         <div className="inputRadio">
//           <label className="labelAnswer">True Answer:</label>
//           <input
//             type="radio"
//             value={true}
//             name="answerType1"
//             onChange={handleChange}
//           />
//         </div>

//         <label>
//           Answer:
//           <input
//             className="inputText"
//             type="text"
//             name="answerText1"
//             onChange={handleChange}
//             placeholder="Type your Answer"
//           />
//         </label>

//         <div className="inputRadio">
//           <label className="labelAnswer">True Answer:</label>
//           <input
//             type="radio"
//             value={true}
//             name="answerType2"
//             onChange={handleChange}
//           />
//         </div>

//         <label>
//           Answer:
//           <input
//             className="inputText"
//             type="text"
//             name="answerText2"
//             onChange={handleChange}
//             placeholder="Type your Answer"
//           />
//         </label>

//         <div className="inputRadio">
//           <label className="labelAnswer">True Answer:</label>
//           <input
//             type="radio"
//             value={true}
//             name="answerType3"
//             onChange={handleChange}
//           />
//         </div>

//         <label>
//           Answer:
//           <input
//             className="inputText"
//             type="text"
//             name="answerText3"
//             onChange={handleChange}
//             placeholder="Type your Answer"
//           />
//         </label>

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Survey;

import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileIcon from "../../component/proflepage";
import Navigation from "../../component/navigation";

const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authorization = "Bearer " + location.state?.data;

  const [surveyData, setSurveyData] = useState({
    title: "",
    questions: [
      {
        questionName: "",
        questionType: "",
        answers: [
          { answerText: "", answerType: true },
          { answerText: "", answerType: false },
        ],
      },
    ],
  });
  const handleChange = (e, questionIndex, answerIndex) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      const updatedQuestions = [...surveyData.questions];
      updatedQuestions[questionIndex].answers.forEach((answer, index) => {
        answer.answerType = name === `answerType-${questionIndex}-${index}`;
      });

      setSurveyData({
        ...surveyData,
        questions: updatedQuestions,
      });
    } else {
      if (name.startsWith("answerText")) {
        const updatedQuestions = [...surveyData.questions];
        updatedQuestions[questionIndex].answers[answerIndex].answerText = value;

        setSurveyData({
          ...surveyData,
          questions: updatedQuestions,
        });
      } else if (name.startsWith("questionName")) {
        const updatedQuestions = [...surveyData.questions];
        updatedQuestions[questionIndex].questionName = value;

        setSurveyData({
          ...surveyData,
          questions: updatedQuestions,
        });
      } else if (name.startsWith("questionType")) {
        const updatedQuestions = [...surveyData.questions];
        updatedQuestions[questionIndex].questionType = value;

        setSurveyData({
          ...surveyData,
          questions: updatedQuestions,
        });
      } else {
        setSurveyData({
          ...surveyData,
          [name]: value,
        });
      }
    }
  };

  const handleAddQuestion = () => {
    setSurveyData({
      ...surveyData,
      questions: [
        ...surveyData.questions,
        {
          questionName: "",
          questionType: "",
          answers: [
            { answerText: "", answerType: true },
            { answerText: "", answerType: false },
          ],
        },
      ],
    });
  };

  const handleAddAnswer = (questionIndex) => {
    setSurveyData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex].answers.push({
        answerText: "",
        answerType: false,
      });

      return {
        ...prevData,
        questions: updatedQuestions,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/survey/new",
        surveyData,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      console.log(response.data);
      navigate(`/get`);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div>
      <ProfileIcon />
      <Navigation />
      <form onSubmit={handleSubmit}>
        <label>
          Survey Title:
          <input
            type="text"
            name="title"
            value={surveyData.title}
            onChange={(e) => handleChange(e)}
            placeholder="Type your Survey title here"
          />
        </label>

        {surveyData.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <label>
              Question:
              <input
                type="text"
                name={`questionName-${questionIndex}`}
                value={question.questionName}
                onChange={(e) => handleChange(e, questionIndex)}
                placeholder="Type your question here"
              />
            </label>

            <label>
              Select Form Type:
              <select
                name={`questionType-${questionIndex}`}
                value={question.questionType}
                onChange={(e) => handleChange(e, questionIndex)}
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="radio">Radio Form</option>
                <option value="checkbox">Checkbox Form</option>
                <option value="input">Input Form</option>
              </select>
            </label>

            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <div className="inputRadio">
                  <label className="labelAnswer">True Answer:</label>
                  <input
                    type="radio"
                    value={true}
                    name={`answerType-${questionIndex}-${answerIndex}`}
                    checked={answer.answerType}
                    onChange={(e) =>
                      handleChange(e, questionIndex, answerIndex)
                    }
                  />
                </div>

                <label>
                  Answer:
                  <input
                    className="inputText"
                    type="text"
                    name={`answerText-${questionIndex}-${answerIndex}`}
                    value={answer.answerText}
                    onChange={(e) =>
                      handleChange(e, questionIndex, answerIndex)
                    }
                    placeholder="Type your Answer"
                  />
                </label>
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleAddAnswer(questionIndex)}
            >
              Add Answer
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Survey;
