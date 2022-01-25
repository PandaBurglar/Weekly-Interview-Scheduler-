import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


function selectedNames(props) {
  return(
    props.selected && <p> {props.name} </p>
  );
}
export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewerClass", {
    "interviewers__item": true,
    'interviewers__item--selected': props.selected,
    "interviewers__item-image": props.avatar
});
  return(
    <li onClick={props.setInterviewer} className={interviewerClass}>
    <img
      className={interviewerClass}
      src={props.avatar}
      alt={props.name}
    />
    {selectedNames(props)}
    </li>
  );
}