import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal"; // importing popup for calendar
import NavBar from "../routes/NavBar";
import { useAppContext } from '../context/AppContext';
// styling
import '../index.css';

// formatting of imported calendar
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// helping modal to become more accessible
Modal.setAppElement("#root");

// using useAppContext to connect added events with existing events
const DisplayEvents = () => {
  const { events, setEvents } = useAppContext(); 

  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 28));
  const [currentView, setCurrentView] = useState("month");

  // modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

// handling of each button on modal popup
  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false); // not open until user clicks event
    setSelectedEvent(null);
  };

  const handleSave = () => {
    setEvents(prev =>
      prev.map(e => e.id === selectedEvent.id ? selectedEvent : e)
    );
    closeModal();
  };

  const handleDelete = () => {
    setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
    closeModal();
  };

  return (
    <div>
      <NavBar />
      <div style={{ margin: "2rem" }}>
        <h1>Your Upcoming Events</h1>
        <Calendar
          localizer={localizer}
          events={events} // using context for events
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={["month", "week", "day"]}
          view={currentView}
          onView={setCurrentView}
          date={currentDate}
          onNavigate={setCurrentDate}
          toolbar
          popup
          onSelectEvent={openModal} // click triggers modal popup open
        />

        {selectedEvent && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Event"
            style={{ content: { maxWidth: "400px", margin: "auto", padding: "20px" } }}
          >
            <h2>Edit Event</h2>
            <label>Title:</label>
            <input
              type="text"
              value={selectedEvent.title}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
            />
            <label>Description:</label>
            <input
              type="text"
              value={selectedEvent.description || ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
            />
            <label>Location:</label>
            <input
              type="text"
              value={selectedEvent.location || ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleDelete} className="delete-btn">Delete</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DisplayEvents;