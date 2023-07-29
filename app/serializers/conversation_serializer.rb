class ConversationSerializer < ActiveModel::Serializer
    attributes :id, :conversation_title, :client_id, :petsitter_id, :created_at

    belongs_to :petsitter
    belongs_to :client
end