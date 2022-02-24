import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  function selectedNames(props) {
    return(
      props.selected && <p> {props.name} </p>
    );
  }
  
  const interviewerClass = classNames("interviewers_item", {
    "interviewers__item--selected": props.selected,
 });

  return(
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
    {selectedNames(props)}
    </li>
  );
}