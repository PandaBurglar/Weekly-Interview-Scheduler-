import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  
  const {days, value, onChange} = props;
  
  const dayOfWeek = days.map (eachDay => {
    return (
      <DayListItem 
      key={eachDay.id} 
      name={eachDay.name} 
      spots={eachDay.spots}
      selected={eachDay.name === value}
      setDay={onChange}
      />
    )
  });
  
  return (
   <ul> {dayOfWeek} </ul>
  );
};