import { useState } from "react"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"

const ChatMainUi  = () => {
    const {textInput, setTextInput} = useState('')
    return (
        <>
            <h1>Welcome to chat bot </h1>
            <div>
                {["mesg 1 " , "sflkjdfksdjf "].map((e,i)=> {
                    return (
                        <div key={e+i}>
                            <ChatBubble message={e} isUser={i%2}/>
                        </div>
                    )
                }                
                )}
                <ChatInput />
            </div>
        </>
    )
}

export default ChatMainUi 