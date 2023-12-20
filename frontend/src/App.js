import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignupForm from "./pages/signup/Signup";

import ProfileUpload from "./pages/profile/profileUpload";
import Survey from "./pages/survey/survey";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pp" element={<ProfileUpload />} />
          <Route path="/" element={<SignupForm />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
