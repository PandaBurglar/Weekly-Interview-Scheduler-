import React from "react";


function formatAppointment(props){
  return(
    (!props.time ? "No Appointments" :`Appointment at ${props.time}`)
  );
}

export default function Appointment (props) {
  return (
    <article className="appointment"> {formatAppointment(props)} </article>
  );
};