import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Box ,List,ListItem,ListItemText,Typography,useTheme} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
const Calendar =() => {
    const theme=useTheme();
    const colors =tokens(theme.palette.mode);
    const [currentEvents ,setCurrentEvents]=useState([]);
    const handleDateClick=(selected) => {
        const title =prompt('please enter a new title for your event');
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
              id: `${selected.dateStr}-${title}`,
              title,
              start: selected.startStr,
              end: selected.endStr,
              allDay: selected.allDay,
            });
        }
    };
    
    const handleEventClick=(selected) => {
        if(
            window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)
        ) {
            selected.event.remove();
        }
    };
    return (
        <Box m='20px'>
            <Header title ='Calendar' subtitle="Full Calendar for Key Event " />
            <Box display="flex" justifyContent="space-between" >
                { /* Calendar SideBar */}
                <Box
                 flex ='1 1 10%'
                 backgroundColor={colors.primary[400]}
                 p='15px'
                 borderRadius= '4px'>
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem 
                            key={event.id}
                            sx={{
                                backgroundColor:colors.greenAccent[500],
                                margin:"10px 0",
                                borderRadius:'2px',
                            }}>
                                <ListItemText 
                                
                                primary={event.title}
                                secondary={
                                    <Typography>
                                        {formatDate(event.start , {
                                            year:'numeric',
                                            month:'short',
                                            day:'numeric',
                                        })}
                                    </Typography>
                                }
                                />
                            </ListItem>
                        ))}
                    </List>



                 </Box>

                 
               <Box  flex='1 1 50%' ml='15px' >
               
                <FullCalendar 
                heigh="75vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ]}
                headerToolbar={{
                    left:'prev,next today',
                    center:'title',
                    right:"dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialtView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvent={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events ) => setCurrentEvents(events)}
                initialEvents={[
                    {id :"1234" , title:"All-day event" , date:"2023-08-14"},
                    {id:"5879" , title:"Timed event", date:"2023-09-28"},
                    {id:"458" , title:"soon", date:"2023-08-08"},
                    {id:"458" , title:"soon", date:"2023-06-06"},
                ]}
                />
              
                </Box>  
                

            </Box>

        </Box>
    );
};
export default Calendar;