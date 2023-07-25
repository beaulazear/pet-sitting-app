class Petsitter < ApplicationRecord
    belongs_to :user
    has_many :appointments
    has_many :clients, through: :appointments


    validates :bio, presence: true
    validates :city, presence: true
    validates :day_rate, presence: true
    validates :user_id, presence: true
    validates :user_id, uniqueness: true

end
