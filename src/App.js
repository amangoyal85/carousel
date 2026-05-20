import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout";
import HomePage from "./pages/home";
import VideoDetailsPage from "./pages/videoDetails";
import UploadPage from "./pages/uploadPage";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/video/:id" element={<VideoDetailsPage />} />
    </Routes>
  </Layout>
);

export default App;
