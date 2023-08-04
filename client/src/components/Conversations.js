import React, { useEffect, useState, useRef } from "react";
import ConversationCard from "./ConversationCard";
import Messages from "./Messages";
import ConversationPetSitterCard from "./ConversationPetSitterCard";
import ConversationClientCard from "./ConversationClientCard";

const headerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, Helvetica, sans-serif',
    color: '#9e9e9e',
    width: '100%',
    fontSize: '36px',
    lineHeight: '1.2',
};

export default function Conversations({ user }) {

    const [conversations, setConversations] = useState([])
    const [openConvoButton, setOpenConvoButton] = useState(false)
    const [currentConvoId, setCurrentConvoId] = useState(null)
    const [messages, setMessages] = useState([])
    const [errors, setErrors] = useState([])

    const bottomElement = useRef(null);

    function scrollToBottom() {
        bottomElement?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    function updateConvoButton(newId) {
        if (openConvoButton === false) {
            setOpenConvoButton(true)
            setCurrentConvoId(newId)
            scrollToBottom()
        } else {
            setOpenConvoButton(false)
            setCurrentConvoId(null)
            scrollToBottom()
        }
    }

    function removeConversation(oldConvo) {
        let newConversations = conversations.filter((convo) => convo.id !== oldConvo.id)
        setConversations(newConversations)
        setCurrentConvoId(null)
        setOpenConvoButton(false)
    }

    function updateConversations(updatedConvo) {
        let filteredConversations = conversations.filter((convo) => convo.id !== updatedConvo.id)
        let newConversations = [...filteredConversations, updatedConvo]
        setConversations(newConversations)

        let newMessageBody = `Automated message: ${user.username} just changed the conversation title to "${updatedConvo.conversation_title}"`

        fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                conversation_id: currentConvoId,
                body: newMessageBody
            })
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((newMessage) => {
                        updateMessages(newMessage)
                        scrollToBottom()
                    });
                } else {
                    response.json().then((errorData) => {
                        setErrors(errorData.errors)
                        console.log(errors)
                    })
                }
            });
    }

    useEffect(() => {
        fetch("/conversations")
            .then((resp) => resp.json())
            .then((convos) => {
                if (user.client && user.petsitter) {
                    let filteredConvos = convos.filter((convo) => convo.petsitter_id === user.petsitter.id || convo.client_id === user.client.id)
                    setConversations(filteredConvos)
                } else if (user.client) {
                    let filteredConvos = convos.filter((convo) => convo.client_id === user.client.id)
                    setConversations(filteredConvos)
                } else {
                    let filteredConvos = convos.filter((convo) => convo.petsitter_id === user.petsitter.id)
                    setConversations(filteredConvos)
                }
                scrollToBottom()
            })
    }, [user])

    useEffect(() => [
        fetch("/messages")
            .then((resp) => resp.json())
            .then((messages) => {
                let convoMessages = messages.filter((message) => message.conversation_id === currentConvoId)
                setMessages(convoMessages)
            })
    ], [currentConvoId])

    function updateMessages(newMessage) {
        const newMessages = [...messages, newMessage]
        setMessages(newMessages)
    }

    if (conversations.length > 0) {
        return (
            <div>
                <div>
                    {conversations.map((conversation) => (
                        <div key={conversation.id}>
                            {openConvoButton === false &&
                                <div>
                                    <h3 style={{ textAlign: "center" }}>Open conversations:</h3>
                                    <ConversationCard updateConvoButton={updateConvoButton} conversation={conversation} user={user} key={conversation.id} />
                                </div>
                            }
                            {currentConvoId === conversation.id && (
                                <div>
                                    <h3 style={{ textAlign: "center" }}>Conversation "{conversation.conversation_title}" between:</h3>
                                    <ConversationPetSitterCard scrollToBottom={scrollToBottom} petSitter={conversation.petsitter} />
                                    <ConversationClientCard updateConversations={updateConversations} conversation={conversation} removeConversation={removeConversation} scrollToBottom={scrollToBottom} client={conversation.client} />
                                    <h3 style={{ textAlign: "center" }}>Messages:</h3>
                                    <Messages updateMessages={updateMessages} messages={messages} scrollToBottom={scrollToBottom} updateConvoButton={updateConvoButton} currentConvoId={currentConvoId} user={user} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div ref={bottomElement}>
                </div>
            </div>
        )
    } else {
        return (
            <div style={headerStyle}>No conversations yet - if you're a client, feel free to start one! Petsitters, clients will reach out when they need help.</div>
        )
    }
}