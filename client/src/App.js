import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage';
import StoryDisplay from './components/StoryDisplay';
import UpdateStory from './components/UpdateStory';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/story' element={<StoryDisplay />} />
          <Route path='/editstory/:id' element={<UpdateStory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
