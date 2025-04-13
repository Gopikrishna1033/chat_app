import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ChatPage from  "./components/chatPage/ChatPage.jsx"
function App() {
  return (
<>
<Router>
  <Routes>
    <Route path="/" element={<ChatPage/>}/>
  </Routes>
</Router>
</>
  );
}

export default App;
