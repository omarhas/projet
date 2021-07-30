import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Modal, Button } from "react-modal";
import Datetime from "react-datetime";
import { Container } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import AddEventModal from "../components/addEventModal.jsx";

const CalendarScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [nomprenom, setNomprenom] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);


  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
      nomprenom: event.nomprenom,
      phone: event.phone,
    });
  };

  async function eventAddHandler(data) {
    await axios.post("/api/calendrier", data.event);
  }

  async function dateSetHandler(data) {
    const response = await axios.get("/api/calendrier");
    setEvents(response.data);
  }

  return (
    <Container>
      <button onClick={() => setModalOpen(true)}>Ajouter un évenement</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        {/* <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          eventAdd={(event) => eventAddHandler(event)}
          datesSet={(date) => dateSetHandler(date)}
        /> */}
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: 'Location polo salah', date: '2021-04-19' },
            { title: 'Location Audi ali', date: '2021-04-19' },
            { title: 'Location Volkswagen aymen', date: '2021-04-19' },
            { title: 'Location Volkswagen aymen', date: '2021-07-18' },
            { title: 'Retour Audi ali', date: '2021-07-18' },
            { title: 'Retour polo salah', date: '2021-07-18' }
          ]}
        />
      </div>
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </Container>
  );
};

export default CalendarScreen;