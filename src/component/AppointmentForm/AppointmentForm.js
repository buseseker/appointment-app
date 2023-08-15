import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { enUS } from "date-fns/locale"; // Import English locale
import { useAppointmentContext } from "../../context/AppointmentContext";
import axios from "axios";

const AppointmentForm = () => {
  const {
    appointmentList,
    addAppointment,
    selectedDepartment,
    setSelectedDepartment,
    selectedOption,
    setSelectedOption,
    selectedDateCal,
    setSelectedDateCal,
  } = useAppointmentContext();

  useEffect(() => {
    axios.get("http://localhost:3000/appointments").then((res) => {
      addAppointment(res.data);
    });
  }, []);

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

  //For Appointment Form

  //For Appointment Card

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    setSelectedOption("");
  };

  const handleOptionChange = (event) => {
    const doctor = event.target.value;
    setSelectedOption(doctor);
    console.log(doctor);
  };

  const handleDateChange = (date) => {
    setSelectedDateCal(date);
  };

  const handleSubmit = () => {
    const isCopy = appointmentList.some(
      (item) =>
        item.selectedDepartment === selectedDepartment &&
        item.selectedOption === selectedOption &&
        item.selectedDateCal === selectedDateCal.toDateString()
    );

    if (!isCopy) {
      axios
        .post("http://localhost:3000/appointments", {
          selectedDepartment,
          selectedOption,
          selectedDateCal: selectedDateCal.toDateString(),
        })
        .then((response) => {
          addAppointment(response.data);
        });
    } else {
      alert("You've already requested this appointment")
    }
  };

  const departmentOptions = departments[selectedDepartment];
  console.log(departmentOptions);
  return (
    <div className="form-container">
      <h1>Make an Appointment</h1>
      <div className="">
        <select value={selectedDepartment} onChange={handleDepartmentChange}>
          <option value="" hidden>
            Choose a Department
          </option>
          <option value="Cardiology">Cardiology</option>
          <option value="Checkup">CheckUp</option>
          <option value="Endocrinology">Endocrinology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Urology">Urology</option>
        </select>
      </div>

      <div>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="" hidden>
            Choose a Doctor
          </option>
          {departmentOptions &&
            departmentOptions.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
      <div>
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDateCal}
            locale={enUS}
          />
        </div>
      </div>
      <button onClick={handleSubmit}>REQUEST AN APPOINTMENT</button>
      <div className="appointment-list">
        {appointmentList.map((listItem) => {
          return (
            <div className="appointment-card">
              <ul>
                <li>Department: {listItem.selectedDepartment}</li>
                <li>Doctor: {listItem.selectedOption}</li>
                <li>Appointment Time: {listItem.selectedDateCal}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AppointmentForm;
