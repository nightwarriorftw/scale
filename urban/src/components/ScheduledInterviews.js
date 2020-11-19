import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ScheduledInterviews = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/schedule/")
      .then((res) => {
        console.log(res);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCancel = (id) => {
    const newEvents = events.filter((event) => event.id !== id);
    axios
      .delete(`http://localhost:8000/api/schedule/${id}`)
      .then((res) => {
        console.log(res.data);
        setEvents(newEvents);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Interview Date</th>
            <th>Start Time</th>
            <th>End time</th>
            <th>Participant</th>
          </tr>
        </thead>

        {events.length > 0 ? (
          events.map((event) => (
            <tr>
              <th key={event.id}>{event.id}</th>
              <td>{event.subject}</td>
              <td>{event.interview_date}</td>
              <td>{event.start_time}</td>
              <td>{event.end_time}</td>
              <td>
                {event.participants.map((q) => (
                   `${q.name} - ${q.email} `
                ))}
              </td>
              <td>
                <Link to={`/interviews/${event.id}`}>
                  <button className="btn btn-info">Edit</button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleCancel(event.id);
                  }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))
        ) : (
          <p>"Loading"</p>
        )}
      </table>
    </div>
  );
};

export default ScheduledInterviews;
