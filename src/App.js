import { useState } from "react";
import "./App.css";
import StartApp from "./Components/StartApp/StartApp";
import Quiz from "./Components/Quiz/Quiz";

function App() {
  const [currentPage, setCurrentPage] = useState('startApp');
  const handleClickStart = () => {
    setCurrentPage('quiz');
  }
  const renderPage = (page) => {
    switch (page) {
      case 'startApp': {
        return <StartApp onClick={handleClickStart} />
      }

      case 'quiz': {
        return <Quiz />
      }
    }
  }
  return (
    <div className="App">
      {renderPage(currentPage)}
    </div>
  );
}

export default App;
