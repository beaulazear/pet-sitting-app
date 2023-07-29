import React, { useEffect, useState } from "react";
import Message from "./Message";

export default function Messages({ currentConvoId, user, scrollToBottom }) {

    const [messages, setMessages] = useState([])

    useEffect(() => [
        fetch("/messages")
            .then((resp) => resp.json())
            .then((messages) => {
                let convoMessages = messages.filter((message) => message.conversation_id === currentConvoId)
                setMessages(convoMessages)
            })
    ], [])

    if (messages.length > 0) {
        return (
            <div>
                {messages.map((message) => (
                    <Message message={message} />
                ))}
            </div>
        )
    } else {
        return (
            <div>
                <p>There are currently no messages in this conversation, send one to start it out!</p>
            </div>
        )
    }
}