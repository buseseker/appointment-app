import React, { useContext, useState, createContext} from "react";
import axios from "axios";

const AppointmentContext = createContext();

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}

export function AppointmentContextProvider({ children }) {
  const [appointmentList, setAppointmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDateCal, setSelectedDateCal] = useState(new Date());

  const addAppointment = (appointment) => {
    setAppointmentList((prevAppointmentList) => [
      ...prevAppointmentList,
      appointment,
    ]);
  };

  //APPOINTMENT DELETE REQUEST
  const deleteAppointment = async (appointmentId) => {
    const response = await axios.delete(
      `http://localhost:3001/appointments/${appointmentId}`
    );
    if (response.status === 200) {
      const updatedAppointments = appointmentList.filter(
        (item) => item.id !== appointmentId
      );
      addAppointment(updatedAppointments);
      console.log(`Deleting appointment with ID: ${appointmentId}`);
    } else {
        console.log(`Something is wrong`);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointmentList,
        addAppointment,
        selectedDepartment,
        setSelectedDepartment,
        selectedOption,
        setSelectedOption,
        selectedDateCal,
        setSelectedDateCal,
        deleteAppointment,
        setAppointmentList,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
