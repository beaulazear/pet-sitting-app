import React from "react";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";

export default function Messages({ currentConvoId, user, updateMessages, messages, scrollToBottom, updateConvoButton }) {

    if (messages.length > 0) {
        return (
            <div>
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
                <NewMessageForm updateConvoButton={updateConvoButton} scrollToBottom={scrollToBottom} currentConvoId={currentConvoId} updateMessages={updateMessages} user={user} />
            </div>
        )
    } else {
        return (
            <div>
                <h4 style={{textAlign: "center"}}>There are currently no messages in this conversation, send one to start it out!</h4>
                <NewMessageForm updateConvoButton={updateConvoButton} scrollToBottom={scrollToBottom} currentConvoId={currentConvoId} updateMessages={updateMessages} user={user} />
            </div>
        )
    }
}