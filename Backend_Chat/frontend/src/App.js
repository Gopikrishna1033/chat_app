import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ChatPage from  "./components/chatPage/ChatPage.jsx"
import Login from "./components/loginPage/Login.jsx";
function App() {
  return (
<>
<Router>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="chatpage" element={<ChatPage/>}/>
  </Routes>
</Router>
</>
  );
}

export default App;
