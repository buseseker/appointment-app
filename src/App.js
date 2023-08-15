import "./App.css";
import Sidebar from "./component/Sidebar/Sidebar";
import Header from "./component/Header/Header";
import MiddleSection from "./component/MiddleSection/MiddleSection";
import AppointmentForm from "./component/AppointmentForm/AppointmentForm";


function App() {
  return (
    <div className="App">
      <Header />
      <MiddleSection />
      <AppointmentForm/>
      <Sidebar />
    </div>
  );
}

export default App;
