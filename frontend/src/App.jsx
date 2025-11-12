import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import NewRequest from './pages/NewRequest.jsx'
import ManagerDashboard from './pages/ManagerDashboard.jsx'
import Track from './pages/Track.jsx'
import History from './pages/History.jsx'
import Summary from './pages/Summary.jsx'

const Nav = () => (
  <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd'}}>
    <Link to="/">New Request</Link>
    <Link to="/manager">Manager</Link>
    <Link to="/track">Track</Link>
    <Link to="/history">Consumption</Link>
    <Link to="/summary">Pending Summary</Link>
  </nav>
)

export default function App(){
  return (
    <div style={{fontFamily:'system-ui, Arial, sans-serif', maxWidth:900, margin:'0 auto'}}>
      <h1 style={{textAlign:'center'}}>Construction Material Request Portal</h1>
      <Nav />
      <Routes>
        <Route path="/" element={<NewRequest />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/track" element={<Track />} />
        <Route path="/history" element={<History />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </div>
  )
}
