class User < ApplicationRecord
    has_secure_password

    validates :username, uniqueness: true

    has_one :petsitter
    has_one :client
end
