class CreateClients < ActiveRecord::Migration[6.1]
  def change
    create_table :clients do |t|
      t.belongs_to :user
      t.string :full_name
      t.text :pet_information
      t.text :ideal_petsitter
      t.string :pet_photo

      t.timestamps
    end
  end
end

#  added ideal_petsitter