class CreateAppointments < ActiveRecord::Migration[6.1]
  def change
    create_table :appointments do |t|
      t.belongs_to :client
      t.belongs_to :petsitter
      t.string :appointment_information
      t.date :start_date
      t.date :end_date
      t.boolean :boarding
      t.boolean :in_house

      t.timestamps
    end
  end
end
