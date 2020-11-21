import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const InterviewDetails = () => {
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const [interviewDate, setInterviewDate] = useState(new Date());
  const [startTime, setStartTime] = useState("16:32:55");
  const [endTime, setEndTime] = useState("16:32:55");
  const [firstParticipantName, setFirstParticipantName] = useState("");
  const [firstParticipantEmail, setFirstParticipantEmail] = useState("");
  const [secondParticipantName, setSecondParticipantName] = useState("");
  const [secondParticipantEmail, setSecondParticipantEmail] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/schedule/${id}`)
      .then((res) => {
        console.log(res.data);
        setSubject(res.data.subject);
        setDescription(res.data.description);
        setInterviewDate(res.data.interview_date);
        setStartTime(res.data.start_time);
        setEndTime(res.data.end_time);
        // setParticipant(res.data.participant);
        setFirstParticipantName(res.data.participants[0].name);
        setFirstParticipantEmail(res.data.participants[0].email);
        setSecondParticipantName(res.data.participants[1].name);
        setSecondParticipantEmail(res.data.participants[1].email);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj1 = {},
      obj2 = {};
    obj1["name"] = firstParticipantName;
    obj1["email"] = firstParticipantEmail;
    obj2["name"] = secondParticipantName;
    obj2["email"] = secondParticipantEmail;

    let participantsList = [obj1, obj2];

    let updateDate = {
      subject: subject,
      description: description,
      interview_date: interviewDate,
      start_time: startTime,
      end_time: endTime,
      participants: participantsList,
      status: true,
    };

    axios
      .put(`http://localhost:8000/api/schedule/${id}/`, updateDate, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="subject">Subject</label>
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
          <label for="description">Description</label>
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
          <label for="interviewDate">Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            value={interviewDate}
            className="form-control"
            placeholder="Interview Date"
            onChange={(e) => setInterviewDate(e.target.value)}
          />
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label for="startTime">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={startTime}
              placeholder="Start Time"
              className="form-control"
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label for="endTime">End Time</label>
            <input
              type="time"
              name="endTime"
              value={endTime}
              placeholder="End Time"
              className="form-control"
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label for="endTime">Participant 1 Name</label>
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
            <label for="endTime">Participant 1 Email</label>
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
            <label for="secondParticipantName">Participant 2 Name</label>
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
            <label for="secondParticpantEmail">Participant 1 Email</label>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default InterviewDetails;
