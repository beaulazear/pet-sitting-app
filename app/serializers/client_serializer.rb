class ClientSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :full_name, :pet_information, :pet_photo, :ideal_petsitter

  belongs_to :user
end
