import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
height: 100%;
width: 100%;
top:0;
left:0;
position: fixed;
background-color: rgba(0,0,0,0.5);
display: flex;
align-items: center;
justify-content: center;
z-index:100;
`;

const Window = styled.div`
width: 90%;
height: 40%;
max-width: 600px;
border-radius: 62px;
background-color: #E6E6E7;
text-align: center;
overflow: hidden;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;

div{
     margin: 0 auto;
    height: 50%;
    width: 100%;
}`;

const Link = styled.div`
font-size: 3vh;
font-weight: bold;
display: flex;
justify-content: center;
align-items: center;
`;

const Label = styled.div`
font-size: 2.66vh;
`;

const Input = styled.input`
margin: 0 auto;
width: 85%;
min-height: 30%;
border: none;
font-size: 30px;
caret-color: #8E8E93;
color: #8E8E93;
padding:10px;

&:focus {outline: none; border:1px solid #8E8E93};
`;

const BtnWrapper = styled.div`
margin-top: 90%;
border-top: 0.3vh solid #69697D;
display: flex;
&:first-child{background-color: red;};
`;

const Button = styled.button`
flex: 1;
border-right: 0.15vh solid #69697D;
border-left: 0.15vh solid #69697D;
color: #007AFF;
font-weight: bold;
font-size: 3vh;
`;

const Wrapper = styled.div`
margin: 0 auto;
height: 50%;
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const DeleteModal = ({showDeleteModal, selectedMinute}) => {
  return (
    <Container>
        <Window>
            <div>           
                <Link>https://calendar.com</Link>
                <Label>Delete event?<br/> {selectedMinute.format('MMMM Do YYYY, h:mm:ss')}</Label>                
            </div>

            <Wrapper>                 
                <Input />                
                <BtnWrapper>
                    <Button onClick= {() =>{showDeleteModal(false)}}>Cancel</Button>
                    <Button onClick = {() => {showDeleteModal(false)}}>OK</Button>
                </BtnWrapper>                
            </Wrapper>
        </Window>
    </Container>
  )
}      
    
export default DeleteModal


