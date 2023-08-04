class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest

  has_one :petsitter
  has_one :client
  has_many :messages
  
end
