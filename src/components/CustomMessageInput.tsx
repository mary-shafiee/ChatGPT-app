import { ArrowButton, MessageInput } from "@chatscope/chat-ui-kit-react"
import { Card, CardBody } from "@nextui-org/react"
interface prop {
    onSend : (message :string) => void 
}
const CustomMessageInput = ({onSend} : prop) => {
  return (
    <Card className="max-w-sx bg-indigo-500 ">
        <CardBody>
            <MessageInput autoFocus attachButton={false} placeholder='Type message here' onSend={onSend} sendButton={false}/>
            <ArrowButton direction="up" />
            
        </CardBody>
    </Card>
  )
}

export default CustomMessageInput