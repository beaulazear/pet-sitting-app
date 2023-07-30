import React from "react";

const conversationCardStyles = {
  conversationCard: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "20px",
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1",
  },
  userPhoto: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  userName: {
    marginTop: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  chatStartedText: {
    fontSize: "12px",
    textAlign: "center",
    marginTop: "5px",
    color: "#999",
  },
  openConversationButton: {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    width: "120px",
    marginTop: "10px",
  },
  conversationTitle: {
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  }
};

export default function ConversationCard({ conversation, updateConvoButton }) {

  const { petsitter, client, created_at } = conversation;

  const date = new Date(created_at);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  function displayMessagesAndForm() {
    updateConvoButton(conversation.id)
  }

  return (
    <div style={conversationCardStyles.conversationCard}>
      <div style={conversationCardStyles.userContainer}>
        <img src={client.photo} alt="Client" style={conversationCardStyles.userPhoto} />
        <p style={conversationCardStyles.userName}>{client.full_name}</p>
      </div>
      <div style={conversationCardStyles.userContainer}>
        <p style={conversationCardStyles.conversationTitle}>{conversation.conversation_title}</p>
        <p style={conversationCardStyles.chatStartedText}>Chat started on {year}-{month}-{day}</p>
        <button onClick={displayMessagesAndForm} style={conversationCardStyles.openConversationButton}>Open Conversation</button>
      </div>
      <div style={conversationCardStyles.userContainer}>
        <img src={petsitter.photo} alt="Petsitter" style={conversationCardStyles.userPhoto} />
        <p style={conversationCardStyles.userName}>{petsitter.full_name}</p>
      </div>
    </div>
  );
}




