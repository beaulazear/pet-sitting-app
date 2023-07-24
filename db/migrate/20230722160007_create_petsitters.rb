class CreatePetsitters < ActiveRecord::Migration[6.1]
  def change
    create_table :petsitters do |t|
      t.belongs_to :user
      t.text :bio
      t.text :my_ideal_pet_sit
      t.string :full_name
      t.string :photo
      t.string :city
      t.integer :day_rate
      t.boolean :currently_available

      t.timestamps
    end
  end
end