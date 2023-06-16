import React from 'react'
import styled from 'styled-components';
import {  useState } from "react";


const Container = styled.div`
background-color: #F6F6F6;
height: 15%;
border-top: 2px solid #E6E6E6;
border-bottom: 2px solid #E6E6E6;
`;

const Wrapper = styled.div`
overflow: hidden;
width: 90% ;
height: 100%;
margin-left: auto;
font-weight: bold;
color: #030303; 
`;

const WeekGrid = styled.div`
display: grid;
height: 33.33%;
grid-template-columns: repeat(7, 1fr);
align-content: center;
p {
  font-size: 1.9vh;
  text-align: center;
}`;

const DaysGrid = styled.div`
display: grid;
height: 33.33%;
grid-template-columns: repeat(7, 1fr);
align-content: center;

.selected {
  background-color: #FF3131;
  color: #030303;
  width:40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
}
.today {
  border: 1px solid #FF3131;
  color: #030303;
  width:40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
}`;

const DayCell = styled.div`
  font-size: 2.5vh;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MonthYear = styled.div`
display: flex;
justify-content: space-between;
margin: 0 50px;
align-items: center;
height: 33.33%;
margin-bottom: auto;

p {
font-size: 2.5vh;
color: #030303;
};

button {
font-size: 3vh;
color: #FF3131;
};
`

const DatePicker = ({currentDay, selectedDay, setSelectedDay, selectedWeek , setSelectedWeek, getWeek}) => {  

  

  const setPreviousWeek = () => {
    const selectedFirstDayInWeek = selectedDay.clone().startOf('week').subtract(7, 'day'); 
    setSelectedDay(selectedDay.clone().subtract(7, 'day'));
    setSelectedWeek(getWeek(selectedFirstDayInWeek));
  };
  
  const setNextWeek = () => {
    const selectedFirstDayInWeek = selectedDay.clone().startOf('week').add(7, 'day'); 
    setSelectedDay(selectedDay.clone().add(7, 'day'));
    setSelectedWeek(getWeek(selectedFirstDayInWeek));
  };  


  return (
    
  <Container >
    <Wrapper >
      <WeekGrid >
        <p>M</p>
        <p>T</p>
        <p>W</p>
        <p>T</p>
        <p>F</p>
        <p>S</p>
        <p>S</p>
      </WeekGrid> 

      <DaysGrid >
          { selectedWeek.map((day) => (

          <DayCell 
            key = {day.format('DDMMYYmm')} 
            onClick={() => {setSelectedDay(day)}} 
            className = { `
            ${day.format('DDMMYYYY') === currentDay.format('DDMMYYYY') ? 'today' : ''}
            ${day.format('DDMMYYYY') === selectedDay.format('DDMMYYYY') ? 'selected' : ''} `}> {day.format('D')}
          </DayCell>
          ))}

      </DaysGrid>

      <MonthYear>
        <button onClick = {setPreviousWeek}>{'<'}</button>
        <p><nobr>{selectedDay.format('MMMM YYYY')}</nobr></p>
        <button onClick = {setNextWeek}>{'>'}</button>
      </MonthYear>
    </Wrapper>
  </Container>
  )
};

export default DatePicker
