import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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


  // function updateSpots(id, isCreation) {
  //   //getting the day
  //   const day = state.days.find(day => day.appointments.includes(id));
    
  //   // isCreation is referring to the appointment creation, if booked -1, if cancelled +1
  //   const newDay = {...day, spots: day.spots + (isCreation ? -1 : 1)}
    
  //   const newDaysArr = state.days.map((day)=> {
  //     if (day.id === newDay.id) {
  //       return newDay
  //     } else {
  //       return day
  //     }
  //   })
  // };

  // spotsRemaining
  function updateSpots(appointments) {

    const allDays = [...state.days];
    
    for (let day of allDays) {
      if (day.name === state.day) {
        let availableSpots = 0;
  
        for (let appointment of day.appointments) {
          if (appointments[appointment].interview === null) {
            availableSpots +=1
          }
        }
        day.spots = availableSpots;
      }
    }   
    return allDays
  };
  
  //  // update spot function 
  //  const spotUpdate = (weekday, day) => {
  //   let spot = day.spots;
  //   if (weekday === day.name) {
  //     if (spot === 0){
  //       return spot
  //     } 
  //     return spot - 1;
  //   // } else if (weekday === day.name && variable === "ADD_SPOT") {

  //   } else if (weekday === day.name) {
  //     if (spot === 5 ){
  //       return spot
  //     } 
  //     return spot + 1;
  //   } else {
  //     return spot;
  //   }
  // };
  // const updateSpots = (weekday, days) => {
  //   // if (variable === "REMOVE_SPOT") {
  //   //   const updatedStateDayArray = days.map((day) => {
  //   //     return {
  //   //       ...day,
  //   //       spots: spotUpdate(weekday, day, variable),
  //   //     };
  //   //   });
  //   //   return updatedStateDayArray;
  //   // }
  //   // if (variable === "ADD_SPOT") {
  //   //   const updatedStateDayArray = days.map((day) => {
  //   //     return {
  //   //       ...day,
  //   //       spots: spotUpdate(weekday, day, variable),
  //   //     };
  //   //   });
  //   //   return updatedStateDayArray;
  //   // }

  //   const updatedStateDayArray = days.map((day) => { 
  //     return { ...day, spots: spotUpdate(weekday, day), 
  //     }; 
  //   }); 
  //   return updatedStateDayArray; 
  // };


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

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      // const spotUpdate = updateSpots(state.day, state.days);
      setState({
        ...state,
        // days: spotUpdate,
        appointments,
        days: updateSpots(appointments),
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
        // const spotUpdate = updateSpots(state.day, state.days);
        setState({
          ...state,
          // days: spotUpdate,
          days: updateSpots(deleteAppointments),
          deleteAppointments
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
    .then(setState({ ...state, days: updateSpots(editedAppointments), editedAppointments }));
  };

  
  return { state, setDay, bookInterview, cancelInterview, editInterview };

} 