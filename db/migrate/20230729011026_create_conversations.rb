class CreateConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :conversations do |t|
      t.belongs_to :petsitter
      t.belongs_to :client
      t.string :conversation_title

      t.timestamps
    end
  end
end
