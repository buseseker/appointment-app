import "./App.css";
import Sidebar from "./component/Sidebar/Sidebar";
import Header from "./component/Header/Header";
import MiddleSection from "./component/MiddleSection/MiddleSection";
import AppointmentForm from "./component/AppointmentForm/AppointmentForm";
import { AppointmentContextProvider } from "./context/AppointmentContext";


function App() {
  return (
    <AppointmentContextProvider>
      <div className="App">
        <Header />
        <MiddleSection />
        <AppointmentForm/>
        <Sidebar />
      </div>
    </AppointmentContextProvider>
  );
}

export default App;
