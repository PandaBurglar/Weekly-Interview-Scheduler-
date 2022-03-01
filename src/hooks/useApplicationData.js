import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


   // update spot function 
   const spotUpdate = (weekday, day, variable) => {
    let spot = day.spots;
    if (weekday === day.name && variable === "REMOVE_SPOT") {
      if (spot === 0){
        return spot
      } 
      return spot - 1;
    } else if (weekday === day.name && variable === "ADD_SPOT") {
      if (spot === 5 ){
        return spot
      } 
      return spot + 1;
    } else {
      return spot;
    }
  };
  const updateSpots = (weekday, days, variable) => {
    // if (variable === "REMOVE_SPOT") {
    //   const updatedStateDayArray = days.map((day) => {
    //     return {
    //       ...day,
    //       spots: spotUpdate(weekday, day, variable),
    //     };
    //   });
    //   return updatedStateDayArray;
    // }
    // if (variable === "ADD_SPOT") {
    //   const updatedStateDayArray = days.map((day) => {
    //     return {
    //       ...day,
    //       spots: spotUpdate(weekday, day, variable),
    //     };
    //   });
    //   return updatedStateDayArray;
    // }

    const updatedStateDayArray = days.map((day) => { 
      return { ...day, spots: spotUpdate(weekday, day, variable), 
      }; 
    }); 
    return updatedStateDayArray; 
  };

  const setDay = (day) => {
    setState((prev) => ({
      ...prev,
      day,
    }));
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),   

    ]).then((all) =>{
      setState(prev => ({
        ...prev, 
        days: all[0].data,
        appointments: all[1].data, 
        interviewers: all[2].data
      })); 
    })
  }, []);

   // booking interviews
   function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const spotUpdate = updateSpots(state.day, state.days);
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
    });
   };

  // cancelling appt
  function cancelInterview(appointment) {
    // console.log("try deleting");
    const deleteAppointment = {
      ...state.appointments[appointment],
      interview: null,
    };
    const deleteAppointments = {
      ...state.appointments,
      [appointment]: deleteAppointment,
    };
    
    return axios
      .delete(`/api/appointments/${appointment}`, deleteAppointment)
      .then(() => {
        const spotUpdate = updateSpots(state.day, state.days);
        setState({
          ...state,
          days: spotUpdate,
          deleteAppointments,
        });
      });
  };

   //function to edit interview
   function editInterview(appointmentId, interviewObj){
    const editedAppointment = {
      ...state.appointments[appointmentId],
      interview: interviewObj,
    };

    const editedAppointments = {
      ...state.appointments,
      [appointmentId]: editedAppointment,
    };

    return axios
    .put(
      `/api/appointments/${appointmentId}`,
      editedAppointments[appointmentId]
    )
    .then(setState({ ...state, appointments: editedAppointments }));
  };

  
  return { state, setDay, bookInterview, cancelInterview, editInterview };

} 