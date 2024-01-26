import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Modal1 from './Modal-1';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
const Modal2 = ({modal2IsOpen,closeModal2}) => {
    const [contacts, setContacts] = useState([])
    const [modal1IsOpen, setModel1IsOpen] = React.useState(false);
    const getContacts = () => {
        fetch('https://contact.mediusware.com/api/contacts/')
        .then(res => res.json())
        .then(data => setContacts(data.results))
    }
    useEffect(()=>{
        getContacts();
    },[])

    function openModal1() {
        closeModal2();
        setModel1IsOpen(true);
      }

    function closeModal1() {
        setModel1IsOpen(false);
    }
    return (
        <div >
        <Modal
        isOpen={modal2IsOpen}
        onRequestClose={closeModal2}
        style={{customStyles,height:'500px'}}
        contentLabel="Example Modal"
      >
        <h2 >Modal-2</h2>

        <div className='mt-4'>
          <button>All Contacts</button>
          <button onClick={openModal1} className='ml-4'>Us Contacts</button>
          <button className='ml-4' onClick={closeModal1}>Close</button>
        </div>

        <div className="">
        {
            contacts.map((contact) => <p>Name: {contact.country.name}</p>)
        }
        </div>
      </Modal>
      <Modal1 modal1IsOpen={modal1IsOpen} closeModal1={closeModal1}></Modal1>
        </div>
    );
};

export default Modal2;