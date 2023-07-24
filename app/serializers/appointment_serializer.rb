class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :appointment_information, :start_date, :end_date, :boarding, :in_house

  belongs_to :petsitter
  belongs_to :client
end
