import React, { useState } from "react";
import axios from "axios";

const HostInterview = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [interviewDate, setInterviewDate] = useState(new Date());
  let [startTime, setStartTime] = useState("16:32:55");
  let [endTime, setEndTime] = useState("16:32:55");
  const [firstParticipantName, setFirstParticipantName] = useState("");
  const [firstParticipantEmail, setFirstParticipantEmail] = useState("");
  const [secondParticipantName, setSecondParticipantName] = useState("");
  const [secondParticipantEmail, setSecondParticipantEmail] = useState("");

  const reset = () => {
    setSubject("");
    setDescription("");
    setFirstParticipantName("");
    setSecondParticipantName("");
    setFirstParticipantEmail("");
    setSecondParticipantEmail("");
    setStartTime("16:32:55");
    setStartTime("16:32:55");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj1 = {},
      obj2 = {};
    obj1["name"] = firstParticipantName;
    obj1["email"] = firstParticipantEmail;
    obj2["name"] = secondParticipantName;
    obj2["email"] = secondParticipantEmail;

    let participantsList = [obj1, obj2];

    startTime += ":00";
    endTime += ":00";

    let newData = {
      subject: subject,
      description: description,
      interview_date: interviewDate,
      start_time: startTime,
      end_time: endTime,
      participants: participantsList,
    };
    console.log(newData);
    axios
      .post("http://localhost:8000/api/schedule/", newData, {
        headers: { "content-type": "application/json" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(subject, description, interviewDate, startTime, endTime);
    // reset();
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1>Host Interviews</h1>

      <form onSubmit={handleSubmit} class="formClass">
        <input
          type="text"
          name="subject"
          id="subject"
          value={subject}
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <br />

        <input
          type="text"
          name="description"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          name="interviewDate"
          placeholder="Interview Date"
          onChange={(e) => setInterviewDate(e.target.value)}
        />
        <br />
        <input
          type="time"
          name="startTime"
          placeholder="Start Time"
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <br />
        <input
          type="time"
          name="endTime"
          placeholder="End Time"
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          name="firstParticipantName"
          value={firstParticipantName}
          placeholder="Participant1 Name"
          onChange={(e) => setFirstParticipantName(e.target.value)}
          required
        />
        <input
          type="email"
          name="firstParticipantEmail"
          value={firstParticipantEmail}
          placeholder="Participant1 email"
          onChange={(e) => setFirstParticipantEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          name="secondParticipantName"
          value={secondParticipantName}
          placeholder="Participant2 Name"
          onChange={(e) => setSecondParticipantName(e.target.value)}

        />
        <input
          type="email"
          name="secondParticipantEmail"
          value={secondParticipantEmail}
          placeholder="Participant2 email"
          onChange={(e) => setSecondParticipantEmail(e.target.value)}
          
        />
        <br />

        <button type="submit" className="btn btn-success">
          Host
        </button>
      </form>
    </div>
  );
};

export default HostInterview;
