import React, {useState} from 'react'
import styled from 'styled-components'
import moment from 'moment/moment'

import  Modal from './components/Modal'
import DatePicker from './components/DatePicker'
import Grid from './components/Grid'
import DeleteModal from './components/DeleteModal'


const Container = styled.div`
margin: 0 auto;
max-width: 740px;
height: 100vh;
display: flex;
flex-direction: column;
background-color: #FFFFFF;
justify-content: space-between;
font-family: 'Roboto';
`;

const Header = styled.div`
margin:0 auto;
width: 90%;
height: 10%;
display:flex;
justify-content: space-between;
align-items: center;

h1 {
color: #030303;
font-weight: 300;
font-size: 3.5vh;
cursor: pointer;
}`;


const Button = styled.button`
color: #FF3131;
display: inline-block;
font-size: 3vh;
padding: 15px 20px; 
height: 100%;
font-weight: 500;
font-family: 'Roboto';
`;

const AddBtn = styled.button`
height: 100%;
font-size: 4vh;
font-weight: 400;
color: #FF3131;
padding: 15px 20px;  
width: 100px;
font-family: 'Roboto';
`;

const Footer = styled.div`
margin:0 auto;
width: 100%;
padding: 0px 30px;  
height: 8%;
display:flex;
justify-content: space-between;
background-color: #F6F6F6;
`;

const Frame = styled.div`
height: 1024px;
`;


const App = () => {

  window.moment = moment;
  moment.updateLocale('ru', {week: {dow: 1}});
    

  const currentDay = moment(); //currentDay-сегодня
  const [selectedDay, setSelectedDay] = useState(currentDay.clone()); //выбранный день( про дефолту -сегодня)

   
 

  const getCurrentMinute = (day) => { // функция возвращает начало следующей десятиминутки (пример: 14:24:45 => 14:30:00; 12:58:44 => 13:00:00)
    const a = day.clone().format('m') //minute - десятиминутка
    const b = (Math.floor(a/10 + 1))*10
    const minute = day.clone().startOf('hour').add(b, 'minute')
    return minute
  } 
  const currentMinute = getCurrentMinute(currentDay) 
  const [selectedMinute, setSelectedMinute] = useState(currentMinute.clone()); //выбраный отрезок минут 




  const getWeek = (day) => { //  возвращает неделю, в которой находится день
    const dayCopy = day.clone().subtract(1, 'day');
    const week = [...Array(7)].map(() => dayCopy.add(1, 'day').clone());
    return week;
  }
  const currentFirstDayInWeek = currentDay.clone().startOf('week');  //ппервый день текущей недели
  const currentWeek = getWeek(currentFirstDayInWeek);  //получаем текущую неделю 
  const [selectedWeek, setSelectedWeek] = useState(currentWeek); //выбранная неделя



  const [modal , showModal] = useState(false)
  const [deleteButton, showDeleteButton] = useState(false)
  const [deleteModal, showDeleteModal] = useState(false)
  

  return (

    <div className="app" >
      
        <Container>
            <Header>
              <h1 onClick={() => {window.location.reload()}}>Interview Calendar</h1>
              <AddBtn onClick = {() =>{showModal(true)}}>+</AddBtn>
            </Header>

            <DatePicker  
            currentDay={currentDay}
            selectedDay = {selectedDay}
            setSelectedDay = {setSelectedDay}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            getWeek={getWeek}
            /> 
          
            <Frame>
              <Grid 
              currentDay={currentDay}
              currentMinute={currentMinute}
              selectedDay={selectedDay}
              deleteButton={deleteButton} 
              showDeleteButton={showDeleteButton}
              selectedMinute={selectedMinute}
              setSelectedMinute={setSelectedMinute}
              />
            </Frame>
            
            <Footer >
              <Button onClick={() => { setSelectedMinute(currentMinute); setSelectedDay(currentDay); setSelectedWeek(currentWeek)}}>Today</Button>
              {deleteButton && (<Button onClick={() => { showDeleteModal(true)}}>Delete</Button>)}
            </Footer >

            { modal && ( <Modal modal={modal} 
                          showModal={showModal}
                          selectedMinute={selectedMinute} />   )}
                   
            { deleteModal && ( <DeleteModal  
                                  showDeleteModal={showDeleteModal} 
                                  selectedMinute={selectedMinute}/> )}

        </Container >
      
    </div>
  )
}

export default App
