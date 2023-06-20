import { mobile, tablet} from '../responsive'
import styled from 'styled-components'



const Container = styled.div`
display: flex;
height: 100%;
`;


const HourGrid = styled.div`
display: grid;
grid-template-rows: repeat(16, 1fr);
width: 10%;
height: 100%; 
justify-content: end;
align-items: center;

${tablet({ width: "15%"})};
${mobile({ width: "19%"})};
`;

const HourCell = styled.div`
 text-align: right;
  font-weight: 500;
  color: rgb(175 173 173);
  font-family: Roboto, monospace;
`;


const MinuteGrid = styled.div`
width: 90%;
height: 100%;
display: grid;
grid-template-columns: repeat(6, 1fr);
grid-template-rows: repeat(16, 1fr);
justify-items: center;

${tablet({ width: "85%"})};
${mobile({ width: "81%"})};
`;

const Wrapper = styled.div`
cursor: pointer;
height:100%;
width:100%;
border: 2px solid #E6E6E6;
border-top: none;
border-left: none;
`;

const MinuteCell = styled.div`       
  
display: flex;
align-items: flex-start;
justify-content: center;
margin: 0;
font-size: 80%;
color:  rgba(0,0,0,0.7);
cursor: pointer;
height:100%;
width:100%;
border: 2px solid white;


&:hover {background-color: #EBECFF;};
&.nowMinute {background-color:  rgb(255, 49, 49, 0.2);};
&.active {background-color:  #D9D9D9;};
`;


 
const Grid = ({ showDeleteButton, 
                  currentDay, 
                  currentMinute, 
                  selectedDay, 
                  selectedMinute, 
                  setSelectedMinute}) => {


const getHours = (day) => { // возвращает массив часов определенного дня  
  const dayCopy = day.clone().startOf('day').subtract(1, 'hour');
  const hours = [...Array(24)].map(() => dayCopy.add(1, 'hour').clone());
  return hours;  
}

const getMinutes = (day) => { // возвращает массив 10-тиминуток определенного дня (в 1 дне 144 10-тиминуток ) 
  const dayCopy = day.clone().startOf('day').subtract( 10,'minute');
  const minutes = [...Array(144)].map(() => dayCopy.add( 10, 'minute').clone());
  return minutes;
}

const currentHours = getHours(currentDay); //получаем часы текущего дня ,для вывода линейки слева (не меняется)
const selectedMinutes = getMinutes(selectedDay); //получаем минуты выбранного дня вывода в сетку 

  return (
    <Container>

      <HourGrid >
        { currentHours.slice(7, 23).map((hour, index) => (<HourCell key = {index}>{hour.format('HH:mm')}</HourCell>))}       
      </HourGrid>

      <MinuteGrid>
        {selectedMinutes.slice(42, 138).map((minute, index) => (

          <Wrapper key = {minute.format('HHmmss')}>
                <MinuteCell 
                      key = {minute.format('HHmm')}
                      onClick={() => {showDeleteButton(true); setSelectedMinute(minute); }}
                      className ={ `${minute.format() === selectedMinute.format()? 'active' : ''}
                                    ${minute.format() === currentMinute.format()? 'nowMinute' : ''}`}>

                        { index < 6 ? `${minute.format('m')} min`: ''} 
                </MinuteCell>
          </Wrapper>
      ))}
      </MinuteGrid>
        
     </Container>       
  )
}
   
export default Grid







