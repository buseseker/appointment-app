import React, { useState,useId } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { enUS } from "date-fns/locale"; // Import English locale
import { useAppointmentContext } from "../../context/AppointmentContext";
import axios from "axios";


const AppointmentForm = () => {
  //CONTEXT
  const {
    appointmentList,
    addAppointment,
    selectedDepartment,
    setSelectedDepartment,
    selectedOption,
    setSelectedOption,
    selectedDateCal,
    setSelectedDateCal,
    setAppointmentList,
    deleteAppointment,
  } = useAppointmentContext();

  //USESTATE FOR ERROR STATEMENT
  const [departmentErr, setDepartmentErr] = useState(false);
  const [doctorErr, setDoctorErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);

  const departments = {
    Cardiology: [
      { value: "shaun", label: "Dr.Shaun Murphy" },
      { value: "neil", label: "Dr.Neil Melendez" },
      { value: "jared", label: "Jared Kalu" },
      { value: "audrey", label: "Dr.Audrey Lim" },
    ],

    Checkup: [
      { value: "morgan", label: "Dr.Morgan Reznick" },
      { value: "claire", label: "Dr.Claire Browne" },
      { value: "jackson", label: "Dr.Jackson Han" },
      { value: "asher", label: "Dr.Asher Wolke" },
    ],

    Endocrinology: [
      { value: "jessica", label: "Dr.Jessica Preston" },
      { value: "marina", label: "Dr.Marina Blaize" },
      { value: "aaron", label: "Dr.Aaron Glassman" },
      { value: "alex", label: "Dr.Alex Park" },
    ],

    Dermatology: [
      { value: "james", label: "Dr.James Kildare" },
      { value: "ruth", label: "Dr.Ruth Bender" },
      { value: "liyana", label: "Dr.Liyana Mcneil" },
      { value: "haider", label: "Dr.Haider Doherty" },
    ],

    Pediatrics: [
      { value: "riley", label: "Dr.Riley Browning" },
      { value: "rodney", label: "Dr.Rodney Holmes" },
      { value: "iwan", label: "Dr.Iwan Dorsey" },
      { value: "john", label: "Dr.John Mata" },
    ],

    Urology: [
      { value: "sophia", label: "Dr.Sophia Nicholson" },
      { value: "rory", label: "Dr.Rory Moody" },
      { value: "brooke", label: "Dr.Brooke Massey" },
      { value: "albert", label: "Dr.Albert Lane" },
    ],
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedOption("");
  };

  const handleOptionChange = (event) => {
    const doctor = event.target.value;
    setSelectedOption(doctor);
  };

  const handleDateChange = (date) => {
    setSelectedDateCal(date);
  };

  //TO ADD NEW APPOINTMENT
  const handleSubmit = () => {
    if (selectedDepartment && selectedOption && selectedDateCal) {
      const isCopy = appointmentList.some(
        (item) =>
          item.selectedDepartment === selectedDepartment &&
          item.selectedOption === selectedOption &&
          item.selectedDateCal === selectedDateCal.toDateString()
      );

      if (!isCopy) {
        axios
          .post("http://localhost:3001/appointments", {
            selectedDepartment,
            selectedOption,
            selectedDateCal: selectedDateCal.toDateString(),
          })
          .then((response) => {
            setAppointmentList(prevAppointmentList=>([...prevAppointmentList,response.data]))
          });
      } else {
        alert("You've already requested this appointment");
      }
    } else {
      !selectedDepartment && setDepartmentErr(true);
      !selectedOption && setDoctorErr(true);
      !selectedDateCal && setDateErr(true);
    }
  };

  const departmentOptions = departments[selectedDepartment];

  return (
    <div className="form-container">
      <h1>Request an Appointment</h1>
      <div className="section-form">
        <div className="calendar">
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDateCal}
              locale={enUS}
              minDate={new Date()}
            />
          </div>
          {dateErr && <p className="err-txt">Should be chosen!</p>}
        </div>
        <div className="select-box">
          <div>
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
            >
              <option value="" hidden>
                {" "}
                Choose a Department{" "}
              </option>
              <option value="Cardiology">Cardiology</option>
              <option value="Checkup">CheckUp</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Urology">Urology</option>
            </select>
            {departmentErr && <p className="err-txt">Should be chosen!</p>}
          </div>

          <div>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="" hidden>
                {" "}
                Choose a Doctor{" "}
              </option>
              {departmentOptions &&
                departmentOptions.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
            </select>
            {doctorErr && <p className="err-txt">Should be chosen!</p>}
          </div>
        </div>
      </div>
      <button className="btn-appointment" onClick={handleSubmit}>
        <i className="fa-solid fa-calendar-check"></i> REQUEST AN APPOINTMENT
      </button>

      <div className="appointment-list">
        {appointmentList.map((appointment) => {
          return (
            <div className="appointment-card" key={appointment.id}>
              <div>
                <ul>
                  <li>Department: {appointment.selectedDepartment}</li>
                  <li>Doctor: {appointment.selectedOption}</li>
                  <li>Appointment Time: {appointment.selectedDateCal}</li>
                </ul>
              </div>
              <div
                className="btn-delete"
              >
                <span
                  onClick={async () => {
                    await deleteAppointment(appointment.id);
                  }}
                >
                  <i className="fa-solid fa-trash-can"></i> Delete
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AppointmentForm;
