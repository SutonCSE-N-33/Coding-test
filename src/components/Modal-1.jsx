import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Modal2 from './Modal-2';

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
const Modal1 = ({modal1IsOpen,closeModal1}) => {
    const [contacts, setContacts] = useState([])
    const [modal2IsOpen, setModel2IsOpen] = React.useState(false);
    const getContacts = () => {
        fetch('https://contact.mediusware.com/api/contacts/')
        .then(res => res.json())
        .then(data => setContacts(data.results))
    }

    useEffect(()=>{
        getContacts();
    },[])

    function openModal2() {
        closeModal1();
        setModel2IsOpen(true);
      }

    function closeModal2() {
        setModel2IsOpen(false);
    }
    return (
        <div >
        <Modal
        isOpen={modal1IsOpen}
        onRequestClose={closeModal1}
        style={{customStyles,height:'500px'}}
        contentLabel="Example Modal"
      >
        <h2 >Modal-1</h2>

        <div className='mt-4'>
          <button>All Contacts</button>
          <button onClick={openModal2} className='ml-4'>Us Contacts</button>
          <button className='ml-4' onClick={closeModal1}>Close</button>
        </div>

        <div className="">
        {
            contacts.map((contact) => <p>Name: {contact.country.name}</p>)
        }
        </div>
      </Modal>
      <Modal2 modal2IsOpen={modal2IsOpen} closeModal2={closeModal2}></Modal2>
        </div>
    );
};

export default Modal1;