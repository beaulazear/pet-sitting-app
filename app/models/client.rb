class Client < ApplicationRecord
    belongs_to :user
    has_many :appointments
    has_many :petsitters, through: :appointments


    validates :full_name, presence: true
    validates :pet_information, presence: true
    validates :pet_photo, presence: true
    validates :user_id, presence: true
    validates :user_id, uniqueness: true

end
