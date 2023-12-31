# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_10_01_194729) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "petsitter_id"
    t.string "appointment_information"
    t.date "start_date"
    t.date "end_date"
    t.boolean "boarding"
    t.boolean "in_house"
    t.boolean "accepted"
    t.boolean "declined"
    t.boolean "completed"
    t.boolean "canceled"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_appointments_on_client_id"
    t.index ["petsitter_id"], name: "index_appointments_on_petsitter_id"
  end

  create_table "clients", force: :cascade do |t|
    t.bigint "user_id"
    t.string "full_name"
    t.text "pet_information"
    t.text "ideal_petsitter"
    t.string "photo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_clients_on_user_id"
  end

  create_table "petsitters", force: :cascade do |t|
    t.bigint "user_id"
    t.text "bio"
    t.text "my_ideal_pet_sit"
    t.string "full_name"
    t.string "photo"
    t.string "city"
    t.integer "day_rate"
    t.boolean "currently_available"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "referrals"
    t.index ["user_id"], name: "index_petsitters_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
