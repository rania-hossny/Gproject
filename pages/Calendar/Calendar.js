import React,{useRef,useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View
import "./calendar.css";
import AddEventModal from "./AddEventModal"
import "react-datetime/css/react-datetime.css";
// import { Form } from 'react-bootstrap';
// import AddItem from './Additem';
import { MdAddCircle } from "react-icons/md";
import Header from '../../Components/Navbar/Navbar';
// import timeGridPlugin from "@fullcalendar/timegrid";


const Calendar = () => {
  // const [state,setState]=useState( [
  //   { title: 'event 1', date: '2021-05-16' },
  //   { title: 'event 2', date: '2021-05-17' }
  // ]
  // );
 const calendarRef = useRef(null);
  
  const onEventAdded=(event)=>{
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent(event)
  }
  const [modalOpen, setModalOpen] = useState(false)
  
  return (
      <>
      <Header/>
         <div className="eventcalendar container">
      
         
      {/* <button onClick={()=>setModalOpen(true)}>Add event</button> */}
      <MdAddCircle className="addEventbtn" onClick={()=>setModalOpen(true)}/>
      
        <div style={{position:"relative",zIndex: 0}}>
        <FullCalendar
              plugins={[ dayGridPlugin, interactionPlugin,listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
              }}
             ref={calendarRef}
             
             // eventClick={
             //   function(arg){
             //     alert(arg.event._def.title)
             //     alert(arg.event._instance.range.start)
             //     alert(arg.event._instance.range.end)
             //     // console.log(arg.event._def.title)
             //     // console.log(arg.event._instance.range)

             //   }
             // }  
   />
        </div>
   <AddEventModal isOpen={modalOpen} onClose={()=>setModalOpen(false)} onEventAdded={event =>onEventAdded(event)}/>     
     </div>
      </>
  )
}

export default Calendar

 



