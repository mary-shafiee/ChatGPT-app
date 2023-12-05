import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput , TypingIndicator, Avatar } from '@chatscope/chat-ui-kit-react';
import reactLogo from './assets/react.svg'

const API_KEY = "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"

function App() {
  const [typing , setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      message : "hello I am ChatGPT",
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

     //process message to chatGPT ( send it over and see the response)
  }

  return (
    <div className='App'>
        <div style={{position:"relative" , height:'100vh' , width:'100vw' , overflow:'hidden'}}>
          <MainContainer>
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
              </MessageList>
              <MessageInput placeholder='Type message here' onSend={handleSend}/>
            </ChatContainer>
          </MainContainer>
        </div>
    </div>
  )
}

export default App
