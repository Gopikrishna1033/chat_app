import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ChatPage from  "./components/chatPage/ChatPage.jsx"
import AuthPages from "./components/authenticationPages/AuthPages.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPages/>} />
          <Route path="chatpage" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
