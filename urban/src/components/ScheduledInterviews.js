import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

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
        // console.log(res.data);
        setEvents(newEvents);
        toast.success("Interview Cancelled");
      })
      .catch((err) => {
        toast.error("Error occoured. Please try again");
      });
  };

  return (
    <div>
      {events.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Interview Date</th>
              <th>Start Time</th>
              <th>End time</th>
              <th>Participants</th>
            </tr>
          </thead>
          {events.map((event) => (
            <tr>
              <th key={event.id}>{event.id}</th>
              <td>{event.subject}</td>
              <td>{event.interview_date}</td>
              <td>{event.start_time}</td>
              <td>{event.end_time}</td>
              <td>
                {event.participants.map((q) => `${q.name} - ${q.email} `)}
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
          ))}
        </table>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default ScheduledInterviews;
