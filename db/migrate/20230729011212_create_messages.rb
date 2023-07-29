class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.belongs_to :conversation
      t.belongs_to :user

      t.timestamps
    end
  end
end
