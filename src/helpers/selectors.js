export function getAppointmentsForDay (state, day) {
  const filteredDaysArr = state.days.find(item => day === item.name);
  if (state.days.length < 1 || filteredDaysArr === undefined) {
    return [];
  }
  const dayArr= filteredDaysArr.appointments.map(id => state.appointments[id]);
  return dayArr;
};

export function getInterview(state, interview) {
  let interviewData = {};
  const interviewers = state.interviewers;
  
  if (!interview) {
    return null;
  }
  interviewData["student"] = interview.student;
  interviewData["interviewer"] = interviewers[interview.interviewer];
  
  return interviewData;
};

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filteredDay = days.find(item => item.name === day);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }

  return  filteredDay.interviewers.map( id => interviewers[id] );

};