import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput , TypingIndicator, Avatar, ArrowButton, ConversationHeader, StarButton, VoiceCallButton, VideoCallButton, InfoButton, MessageSeparator } from '@chatscope/chat-ui-kit-react';
import reactLogo from './assets/user-rounded-svgrepo-com.svg'
import './index.css'
const API_KEY = "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"
import CustomMessageInput from './components/CustomMessageInput';

interface MessagesType {
  message : string ,
  sender : string,
  setTime?: string,
  direction?: string
}
function App() {
  const [typing , setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      message : "Hi I'm Here To Help You ",
      sender : "ChatGPT",
      setTime : 'just now',
      
    }
  ])

  const handleSend = async (message : string) => {
     const newMessage ={
      message : message ,
      sender : 'user',
     }

     const newMessages = [...messages , newMessage] // all old messages + the new one

     // update our messages state
    //@ts-expect-error
     setMessages(newMessages)

     //set a typing indicator 
     setTyping(true)
     setInterval(()=>setTyping(false) , 3000)

     //process message to chatGPT ( send it over and see the response)
     await processMessagesToChatGPT(newMessages)
  }

 const processMessagesToChatGPT = async(chatMessages :MessagesType[]) => {
   chatMessages.map((messageObject : MessagesType)=> {
    let role :string = "" ;
    if(messageObject.sender === "ChatGPT"){
      role = "assistant";
    }else {
      role = "user"
    }
    return { role : role , content : messageObject.message}
  });

  // const systemMessage ={
  //   role : "system",
  //   content : "Explain all concepts like I am more than 18 years old"
  // }
  // const apiRequestBody ={
  //   "model" : "gpt-3.5-turbo",
  //   "messages" : [systemMessage , ...apiMessages]
  // }
  // await fetch("http://api.openai.com/v1/chat/completion" , {
  //     method:"POST",
  //     headers:{
  //       "Authorization":"Bearer" + API_KEY,
  //       "Content-Type" : "application/json"
  //     },
  //     body:JSON.stringify(apiRequestBody)
  // }).then(data => {
  //   return data.json()
  // }).then (data => {
  //       //@ts-expect-error

  //   setMessages([...chatMessages , { message : data?.choices[0]?.message.content , sender: "ChatGPT"}]);
  //   setTyping(false)
  // });
}  

  return (
    <div className='App'>
        <div style={{position:"relative" , height:'100vh' , width:'100vw' , overflow:'hidden'}}>
          <MainContainer style={{display:'flex' , flexDirection:'column'}}>
          <ConversationHeader>
            
            
            <ConversationHeader.Content  />                                   
            <ConversationHeader.Actions>                                                                             
              <StarButton title="Add to favourites"  />
              
              <InfoButton title="Show info" />
            </ConversationHeader.Actions>
        </ConversationHeader>
            <ChatContainer>
              <MessageList
                typingIndicator={typing ? <TypingIndicator/> : null}
              >
                  {messages.map((message , i) => {
                    //@ts-expect-error
                      return <Message key={i} model={message}>
                        <Avatar src={reactLogo} name="user" size="sm"/>
                      </Message>
                    })}
                  <MessageSeparator content="Tuesday, 5 December 2023" as="h2" />
              </MessageList>
              {/* <CustomMessageInput onSend={handleSend}/> */}
             
              <MessageInput autoFocus attachButton={false} placeholder='Type message here' onSend={handleSend}/>
              
             
              
             
            </ChatContainer>
          </MainContainer>
        </div>
    </div>
  )
}

export default App
