class Conversation < ApplicationRecord
    belongs_to :petsitter
    belongs_to :client
    has_many :messages
end