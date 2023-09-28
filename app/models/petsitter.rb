class Petsitter < ApplicationRecord
    belongs_to :user
    has_many :appointments
    has_many :clients, through: :appointments
    has_many :conversations

    validates :full_name, presence: true
    validates :bio, presence: true
    validates :city, presence: true
    validates :day_rate, presence: true
    validates :day_rate, numericality: { only_integer: true }
    validates :user_id, presence: true
    validates :user_id, uniqueness: true
    validates :my_ideal_pet_sit, presence: true

end
