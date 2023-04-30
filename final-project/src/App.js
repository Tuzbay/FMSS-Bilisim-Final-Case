import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { SwapiProvide } from "./context/SwapiContext";
import List from "./components/List/List";
import Footer from "./components/Footer/Footer";
import ListDetail from "./components/ListDetail/ListDetail";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <SwapiProvide>
      {" "}
      {/* Context apiden verileri alabilmek için bu satır ile kod sarmalanır. */}
      <div className="app">
        <Router>
          <Navbar />{" "}
          {/* Navbar her koşulda gösterileceği için Route içine alınmadı. */}
          <Routes>
            <Route /* "/" yolundayken Header ve List listelenir. */
              path="/"
              element={
                <>
                  <Header />
                  <List />
                </>
              }
            />
            {/* Aşağıdaki satırla değişken bir type ve name ile yönlendirme işlemi yapılır. */}
            <Route path="/:type/:name" element={<ListDetail />} />
          </Routes>
          <Footer />{" "}
          {/* Footer her koşulda gösterileceği için Route içine alınmadı. */}
        </Router>
      </div>
    </SwapiProvide>
  );
}

export default App;
