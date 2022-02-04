import React from "react";

import "components/Appointment/styles.scss";

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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
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

  // editing appt
 const edit = () => transition(EDIT);

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
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
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
          interviewer={interview.interviewer}
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