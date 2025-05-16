import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/organisms/Header";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ImageConfigProvider } from "./contexts/ImageConfigContext";

function App() {
  return (
    <Router>
      <ImageConfigProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow mt-12 overflow-y-auto">
            <Routes>
              <Route path="/" element={<MovieListPage />} />
              <Route path="/:id" element={<MovieDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </ImageConfigProvider>
    </Router>
  );
}

export default App;
