import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { handleModal } from "../store/slices/userSlice";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
   const [selectedDate, setSelectedDate] = useState(null);
   const [events, setEvents] = useState([
      {
         title: "Task 1",
         start: new Date(),
         end: new Date(moment().add(1, "hours").toDate()),
      },
   ]);

   const dayPropGetter = (date: Date) => {
      if (selectedDate && moment(date).isSame(selectedDate, "day")) {
         return {
            className: "bg-green-200",
         };
      }
      return {};
   };

   const handleSelectSlot = (slotInfo: any) => {
      setSelectedDate(slotInfo.start);
      openModal();
   };

   const dispatch = useDispatch<AppDispatch>();
   const openModal = () => {
      dispatch(handleModal(true));
   };
   const closeModal = () => {
      dispatch(handleModal(false));
   };

   return (
      <div className="mt-32">
         <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            dayPropGetter={dayPropGetter}
         />
      </div>
   );
};

export default MyCalendar;
