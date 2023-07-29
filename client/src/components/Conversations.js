import React, { useEffect, useState, useRef } from "react";
import ConversationCard from "./ConversationCard";
import Messages from "./Messages";
import ConversationPetSitterCard from "./ConversationPetSitterCard";
import ConversationClientCard from "./ConversationClientCard";

export default function Conversations({ user }) {

    const [conversations, setConversations] = useState([])
    const [openConvoButton, setOpenConvoButton] = useState(false)
    const [currentConvoId, setCurrentConvoId] = useState(null)

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

    if (conversations.length > 0) {
        return (
            <div>
                <div>
                    {conversations.map((conversation) => (
                        <div key={conversation.id}>
                            {openConvoButton === false &&
                                <ConversationCard updateConvoButton={updateConvoButton} conversation={conversation} user={user} key={conversation.id} />
                            }
                            {currentConvoId === conversation.id && (
                                <div>
                                    <h3 style={{ textAlign: "center" }}>Conversation between:</h3>
                                    <ConversationPetSitterCard scrollToBottom={scrollToBottom} petSitter={conversation.petsitter} />
                                    <ConversationClientCard scrollToBottom={scrollToBottom} client={conversation.client} />
                                    <h3 style={{ textAlign: "center" }}>Messages:</h3>
                                    <Messages scrollToBottom={scrollToBottom} updateConvoButton={updateConvoButton} currentConvoId={currentConvoId} user={user} />
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
            <div>No conversations yet, feel free to start one!</div>
        )
    }
}