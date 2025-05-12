import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ChatPage from  "./components/chatPage/ChatPage.jsx"
import AuthPages from "./components/authenticationPages/AuthPages.jsx";
import ContextApi from "./components/context/ContextApi.jsx";
import ProtectedRoute from "./components/context/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Router>
        <ContextApi>
          <Routes>
            <Route path="/" element={<AuthPages />} />
            <Route
              path="chatpage"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ContextApi>
      </Router>
    </>
  );
}

export default App;
