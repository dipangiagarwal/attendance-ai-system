import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Batches from './pages/Batches';
import Attendance from './pages/Attendance';
import Embeddings from './pages/Embeddings';
import Cameras from './pages/Cameras';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/batches" element={<Batches />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/embeddings" element={<Embeddings />} />
                <Route path="/cameras" element={<Cameras />} />
            </Routes>
        </Router>
    );
}

export default App;