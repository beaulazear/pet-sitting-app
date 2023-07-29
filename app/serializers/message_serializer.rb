class MessageSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :conversation_id, :body, :created_at

    belongs_to :user
    belongs_to :conversation
end