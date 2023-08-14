class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true
    validates :username, presence: true

    has_one :petsitter
    has_one :client
    has_many :messages
    has_many :conversations, -> { distinct }, through: :messages

end
