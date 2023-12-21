import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import ProfileIcon from "../../component/proflepage";
import Navigation from "../../component/navigation";

const GetSurvey = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/survey/getSurvey"
        );

        // Assuming the response.data is an array of surveys
        setSurveys(response.data.surveyData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <section>
      <Navigation />
      <ProfileIcon />
      <br></br>
      <h2>Survey Table</h2>
      <div className="grid-container">
        {surveys.map((survey, index) => (
          <div key={index} className="survey-container">
            <h3>Title:{survey.title}</h3>
            {survey.questions.map((question, qIndex) => (
              <div key={`${index}-${qIndex}`} className="question-container">
                <div className="left-column">
                  <h4>Question:</h4>
                  <h5>{question.questionName}</h5>
                  <p>Question Type: {question.questionType}</p>
                </div>
                <div className="right-column">
                  {question.answers.map((answer, aIndex) => (
                    <div
                      key={`${index}-${qIndex}-${aIndex}`}
                      className="answer-container"
                    >
                      <p>Answer Text: {answer.answerText}</p>
                      <p>Answer Type: {String(answer.answerType)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetSurvey;
