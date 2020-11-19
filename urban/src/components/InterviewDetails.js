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
        setFirstParticipantName(res.data.participants[0].name)
        setFirstParticipantEmail(res.data.participants[0].email)
        setSecondParticipantName(res.data.participants[1].name)
        setSecondParticipantEmail(res.data.participants[1].email)
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
      status: true
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
    <div>
      <form onSubmit={handleSubmit} className="form-class">
        <input
          type="text"
          name="subject"
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
          value={interviewDate}
          placeholder="Interview Date"
          onChange={(e) => setInterviewDate(e.target.value)}
        />
        <br />
        <input
          type="time"
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <br />
        <input
          type="time"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <br />
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
          required
        />
        <input
          type="email"
          name="secondParticipantEmail"
          value={secondParticipantEmail}
          placeholder="Participant2 email"
          onChange={(e) => setSecondParticipantEmail(e.target.value)}
          required
        />
        <br />

        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default InterviewDetails;
