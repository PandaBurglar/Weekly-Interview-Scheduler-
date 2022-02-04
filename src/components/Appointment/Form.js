import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const Reset = () => {
      setStudent("");
      setInterviewer(null);
  };
  
  // function calls reset when cancel is clicked
  const Cancel = () => {
      Reset();
      props.onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSave(student, interviewer)
  }

   // function to check student name
  function onSave (){

    props.onSave(student,interviewer)
  }

  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form  onSubmit={(event)=>handleSubmit(event)} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}  
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={Cancel} danger >Cancel</Button>
          <Button onClick={onSave} confirm  onSubmit={event => event.preventDefault()} >Save</Button>
        </section>
      </section>
    </main>
  );
}