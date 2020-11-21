import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      .then((res) => {
        toast.success("Interview Scheduled");
      })
      .catch((err) => {
        if (err.response.data[0]) {
          toast.error(err.response.data[0]);
        } else {
          toast.error("Error occoured. Please try again");
        }
      });

    console.log(subject, description, interviewDate, startTime, endTime);
    reset();
  };

  return (
    <div className="container">
      <h1>Host Interviews</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            className="form-control"
            value={subject}
            placeholder="Subject"
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            className="form-control"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interviewDate">Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            className="form-control"
            placeholder="Interview Date"
            onChange={(e) => setInterviewDate(e.target.value)}
          />
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              name="startTime"
              placeholder="Start Time"
              className="form-control"
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              name="endTime"
              placeholder="End Time"
              className="form-control"
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="endTime">Participant 1 Name</label>
            <input
              type="text"
              name="firstParticipantName"
              value={firstParticipantName}
              className="form-control"
              placeholder="Participant1 Name"
              onChange={(e) => setFirstParticipantName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="endTime">Participant 1 Email</label>
            <input
              type="email"
              name="firstParticipantEmail"
              value={firstParticipantEmail}
              placeholder="Participant1 email"
              className="form-control"
              onChange={(e) => setFirstParticipantEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="secondParticipantName">Participant 2 Name</label>
            <input
              type="text"
              name="secondParticipantName"
              value={secondParticipantName}
              className="form-control"
              placeholder="Participant2 Name"
              onChange={(e) => setSecondParticipantName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="secondParticpantEmail">Participant 1 Email</label>
            <input
              type="email"
              name="secondParticipantEmail"
              value={secondParticipantEmail}
              placeholder="Participant2 Email"
              className="form-control"
              onChange={(e) => setSecondParticipantEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Host
        </button>
      </form>
    </div>
  );
};

export default HostInterview;
