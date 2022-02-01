export function getAppointmentsForDay (state, day) {
  let dayArr = [];
  let appForDay = state.days.filter(days => {
      if(days.name === day) {
        dayArr = days.appointments.map(apptId => state.appointments[apptId])
      }
    })
    return dayArr;
}; 