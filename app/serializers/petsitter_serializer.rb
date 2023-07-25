class PetsitterSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :bio, :photo, :city, :day_rate, :currently_available, :my_ideal_pet_sit, :full_name

  belongs_to :user
  has_many :appointments
  # has_many :clients, through: :appointments
end
