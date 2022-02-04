import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  console.log("dayListItem", props);
  function formatSpots(props){
    return(
      (props.spots === 0 ? "no spots remaining" :(props.spots === 1 ? "1 spot remaining" : `${props.spots} spots remaining`))
    );
  }
  
  const dayClass = classNames("dayClass", {
      'day-list__item': true,
      'day-list__item--selected': props.selected,
      "day-list__item--full": props.spots === 0
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}> 
      <h2  className="text--regular"> {props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)} </h3>
    </li>
  );
}