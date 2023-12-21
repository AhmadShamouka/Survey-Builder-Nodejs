import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import ProfileIcon from "../../component/proflepage";
import Navigation from "../../component/navigation";

const UserGetSurvey = () => {
  const surveyId = useLocation().state.data;
  console.log(surveyId);
  const token = localStorage.getItem("jwtToken");

  const authorization = "Bearer " + token;
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/survey/getOneSurvey",
          { surveyId: surveyId },
          {
            headers: {
              Authorization: authorization,
            },
          }
        );

        if (
          response.data.surveyData &&
          typeof response.data.surveyData === "object"
        ) {
          setSurvey(response.data.surveyData);
          console.log(response.data);
        } else {
          console.error("Invalid survey data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    fetchSurvey();
  }, [surveyId, authorization]);

  const renderQuestionInput = (question) => {
    if (question.questionType === "radio") {
      return (
        <div className="block">
          {question.answers.map((answer, index) => (
            <div className="flex" key={index}>
              <input
                type="radio"
                name={`question_${question._id}`}
                value={answer.answerText}
              />
              <label>{answer.answerText}</label>
            </div>
          ))}
        </div>
      );
    } else if (question.questionType === "checkbox") {
      return (
        <div className="block">
          {question.answers.map((answer, index) => (
            <div className="flex" key={index}>
              <input
                type="checkbox"
                name={`question_${question._id}`}
                value={answer.answerText}
              />
              <label>{answer.answerText}</label>
            </div>
          ))}
        </div>
      );
    } else if (question.questionType === "input") {
      return <input type="text" />;
    } else {
      return null;
    }
  };

  return (
    <section>
      <Navigation />
      <ProfileIcon />
      <br></br>
      <h2>Survey Details</h2>
      {survey && (
        <div className="survey-container">
          <h3>Title: {survey.title}</h3>
          <div className="flex">
            <p>
              {survey.questions.map((question, index) => (
                <p key={index}>
                  <b>Question:</b> {question.questionName}
                  {renderQuestionInput(question)}
                </p>
              ))}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserGetSurvey;
