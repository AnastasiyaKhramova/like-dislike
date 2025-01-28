import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CommentsList from './components/CommentsList.tsx';
import CommentDetail from './components/CommentDetails.tsx';

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<CommentsList />} />
            <Route path="/comment/:id" element={<CommentDetail />} />
        </Routes>
    </Router>
);

export default App;

