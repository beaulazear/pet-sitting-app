class PetsitterSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :bio, :photo, :city, :day_rate, :currently_available, :my_ideal_pet_sit, :full_name, :clients, :appointments

  belongs_to :user
  has_many :appointments
  has_many :clients
end
