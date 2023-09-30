class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true
    validates :username, presence: true

    has_one :petsitter
    has_one :client

end
