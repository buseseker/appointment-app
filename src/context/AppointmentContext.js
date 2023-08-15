import React, { useContext, useState, createContext } from "react";

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
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
