import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [nomprenom, setNomprenom] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder='titre'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <input
          type='text'
          className='bordure form-control'
          id='name'
          placeholder='Nom et prénom du client'
          value={nomprenom}
          onChange={(e) => setNomprenom(e.target.value)}
        ></input>
        <input
          type='text'
          className='bordure form-control'
          id='phone'
          placeholder='Numéro de téléphone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>*/}
        <div>
          <label>Date début</label>
          <Datetime value={start} onChange={(date) => setStart(date)} />
        </div>
        <div>
          <label>Date fin</label>
          <Datetime value={end} onChange={(date) => setEnd(date)} />
        </div>
        <button>Ajouter</button>
      </form>
    </Modal>
  );
}
