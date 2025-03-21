import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Contact from './Pages/Contact';
import PassportFinder from './Pages/PassportFinder';
import IdFinder from './Pages/IdFinder';
import Report from './Pages/Report';
import Footer from './Components/Footer';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import ApplyId from './Pages/ApplyId';
import KRAFinder from './Pages/KRAFinder';
import ReportPassport from './Pages/ReportPassport';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewId from './Forms/NewId';
import LostId from './Forms/LostId';
import FormsUpload from './Forms/FormsUpload';
import MyProfile from './Pages/MyProfile';
import LoadingSpinner from './Components/LoadingSpinner';


const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/id-finder" element={<IdFinder />} />
          <Route path="/applications" element={<ApplyId />} />
          <Route path="/new-id" element={<NewId />} />
          <Route path="/lost-id" element={<LostId />} />
          <Route path="/forms-upload" element={<FormsUpload />} />
          <Route path="/kra-finder" element={<KRAFinder />} />
          <Route path="/passport-finder" element={<PassportFinder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/report" element={<Report />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/passport-report" element={<ReportPassport />} />
          <Route path="/loading" element={<LoadingSpinner />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
