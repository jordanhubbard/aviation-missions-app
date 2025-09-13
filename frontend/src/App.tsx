// import React from 'react' // Not needed in React 18 with new JSX transform
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './styles/print.css'
import Navigation from './components/Navigation'
import MissionList from './pages/MissionList'
import MissionDetail from './pages/MissionDetail'
import SubmitMission from './pages/SubmitMission'
import AdminPanel from './pages/AdminPanel'
import EditMission from './pages/EditMission'
import Challenges from './pages/Challenges'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Container fluid className="mt-4">
        <Routes>
          <Route path="/" element={<MissionList />} />
          <Route path="/missions/:id" element={<MissionDetail />} />
          <Route path="/missions/:id/edit" element={<EditMission />} />
          <Route path="/submit" element={<SubmitMission />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/challenges" element={<Challenges />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
