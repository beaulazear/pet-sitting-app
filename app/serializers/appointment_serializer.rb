class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :canceled, :appointment_information, :start_date, :end_date, :boarding, :in_house, :accepted, :declined, :completed, :client_id, :petsitter_id, :client, :petsitter

  belongs_to :petsitter
  belongs_to :client
end
