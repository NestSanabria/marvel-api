import './App.css';
import { Comic } from './components/Comic';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Description } from './components/Description';

function App() {
  return (
    <Router>
      <div className="app-background">
        <Routes>
          <Route path="/" element={<Comic />} />
          <Route path="/comic/:id" element={<Description />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
