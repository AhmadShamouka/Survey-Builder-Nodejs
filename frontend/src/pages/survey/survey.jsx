// ProfilePictureUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import InputForm from "../../component/inputForm.jsx/inputForm";
import OptionForm from "../../component/checkbox.jsx/optionsForm";

const Survey = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [forms, setForms] = useState([]);

  const handleOptionChange = (e) => {
    setSelectedOption({ ...selectedOption, [e.target.name]: e.target.value });
  };

  const handleAddForm = () => {
    if (selectedOption) {
      setForms((prevForms) => [...prevForms, selectedOption]);
      setSelectedOption("");
    }
  };

  const renderForm = (formType, index) => {
    switch (formType) {
      case "radio":
        return <OptionForm key={index} />;
      case "checkbox":
        return <OptionForm key={index} />;
      case "input":
        return <InputForm key={index} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <label>
        Select Form Type:
        <select value={selectedOption} onChange={handleOptionChange}>
          <option defaultChecked>Select...</option>
          <option value="radio">Radio Form</option>
          <option value="checkbox">Checkbox Form</option>
          <option value="input">Input Form</option>
        </select>
      </label>
      <button onClick={handleAddForm}>Add Form</button>

      <div>{forms.map((formType, index) => renderForm(formType, index))}</div>
    </div>
  );
};

export default Survey;
