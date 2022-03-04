import React from "react";

import "components/Appointment/styles.scss";
import { useState } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

// helpers //
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  const { time, interview, interviewers } = props;
  const [editing, setEditing] = useState(false)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);

    props.bookInterview(props.id, interview, editing)
    .then(()=> transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true));
  }

  //only perform the deletion when the user confirms
   const confirm = () => {
     console.log("hello");
    transition(CONFIRM);
      // to delete appt 
  };
  const cancelledAppointment = () => {
    console.log("cancel");
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

 //interview edit
 const edit = () => {
  setEditing(true)
  transition(EDIT)};

  //create interview
  const create = () => {
    setEditing(false)
    transition(CREATE)};

  return (
    <article className="appointment"> 
    <Header 
      time={time}  
    />
    {mode === SHOW && (
       <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onEdit={edit}
        onDelete={confirm}
       />
    )}
    {mode === EMPTY && <Empty onAdd={create} />}
    {mode === CREATE && (
       <Form 
        interviewers={interviewers}
        onCancel={back} 
        onSave = {save}
       />
       )}
    {mode === SAVING &&
       (<Status  text="Saving"/>)}
    {mode ===DELETING &&
       (<Status text="Deleting"/>)}
    {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={cancelledAppointment}
        />
    )}
    {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
    )}
      {mode === ERROR_SAVE && (
        <Error text="Appointment could not be saved." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error text="Appointment could not be deleted." onClose={back} />
      )}
    </article>
  );
};