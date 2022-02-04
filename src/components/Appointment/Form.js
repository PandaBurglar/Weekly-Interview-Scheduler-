import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const Reset = () => {
      setStudent("");
      setError("");
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
    function validate() {
      if (student === "") {
        setError("Student name cannot be blank");
        return;
      }
      setError("");
      props.onSave(student, interviewer);
    }

  return ( 
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form  onSubmit={(event) => handleSubmit(event)} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name= {props.name}
            type="text"
            placeholder="Enter Student Name"
            value= {student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}  
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={Cancel} danger >Cancel</Button>
          <Button
            confirm  
            onSubmit={event => event.preventDefault()} 
            onClick={validate}
            >
              Save
            </Button>
        </section>
      </section>
    </main>
  );
}