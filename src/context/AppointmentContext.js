import React, { useContext, useState, createContext, useEffect } from "react";
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

  //TO GET CURRENT APPOINTMENTS WHEN THE PAGE IS LOADED
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/appointments");
      if (response.status === 200) {
        setAppointmentList(response.data);
        console.log("Appointments fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //APPOINTMENT DELETE REQUEST
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/appointments/${id}`);
      setAppointmentList((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
    
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointmentList,
        selectedDepartment,
        setSelectedDepartment,
        selectedOption,
        setSelectedOption,
        selectedDateCal,
        setSelectedDateCal,
        setAppointmentList,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
