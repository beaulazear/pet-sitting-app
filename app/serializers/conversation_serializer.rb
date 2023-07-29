class ConversationSerializer < ActiveModel::Serializer
    attributes :id, :client_id, :petsitter_id, :created_at

    belongs_to :petsitter
    belongs_to :client
end