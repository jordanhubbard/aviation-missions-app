import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material'
import MissionsPage from './pages/MissionsPage'
import MissionDetailsPage from './pages/MissionDetailsPage'
import SubmissionsPage from './pages/SubmissionsPage'
import Navigation from './components/Navigation'

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ✈️ Aviation Mission Management
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Navigation />
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<MissionsPage />} />
          <Route path="/missions/:id" element={<MissionDetailsPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App