class ClientSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :full_name, :pet_information, :photo, :ideal_petsitter

  belongs_to :user
  has_many :appointments
  has_many :conversations
  # has_many :petsitters, through: :appointments
end
