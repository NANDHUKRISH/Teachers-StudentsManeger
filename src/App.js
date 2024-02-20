import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import {useState } from 'react';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import AddStudent from './components/AddStudent';
import AddTeacher from './components/AddTeacher';
import StudentsCards from './components/StudentsCards';
import StudentsList from './components/StudentsList';
import TeachersCards from './components/TeachersCards';
import TeachersList from './components/TeachersList';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StudentsView from './components/StudentsView';
import TeachersView from './components/TeachersView';
import Provider from './components/Provider';
function App() {

    const [style, setStyle] = useState('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion');
    const changeStyle = () => {
        if (style === 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion') {
            setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled');
        } else {
            setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion');
        }
    };

    return (
        <>
            <div id="wrapper">
                <BrowserRouter>
                    <Sidebar style={style} changeStyle={changeStyle} />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar changeStyle={changeStyle} />
                            <Provider>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/students-lists/add-student" element={<AddStudent />} />
                                <Route path="/students-lists/edit-student/:id" element={<AddStudent />} />
                                <Route path="/teachers-lists/add-teacher" element={<AddTeacher />} />
                                <Route path="/teachers-lists/edit-teacher/:id" element={<AddTeacher />} />
                                <Route path="/studentview-user/:userId" element={ <StudentsView/>}/>
                                <Route path="/teachersview-user/:userId" element={ <TeachersView/>}/>
                                <Route path="/students-lists" element={<StudentsList />}/>
                                <Route path="/teachers-lists" element={<TeachersList/>} />
                                <Route path="/students-cards" element={<StudentsCards />}/>
                                <Route path="/teachers-cards" element={<TeachersCards/>} />
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </Routes>
                            </Provider>
                        </div>
                        <Footer />
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
