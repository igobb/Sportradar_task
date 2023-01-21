import './App.css';
import TableWithData from './components/table/Table'
import MatchInfo from './pages/match_info/MatchInfo'
import ErrorPage from "./pages/error_page/ErrorPage";

import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/Sportradar_task" element={<TableWithData />}/>
                <Route path="/MatchInfo" element={<MatchInfo />} />
                <Route path="*" element={<ErrorPage />}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
