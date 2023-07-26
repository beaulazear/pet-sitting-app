# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding users"

User.create(username: "beau", password: "bark", password_confirmation: "bark")
User.create(username: "gerard", password: "clay", password_confirmation: "clay")
User.create(username: "sarah", password: "hubs", password_confirmation: "hubs")
User.create(username: "fred", password: "fergie", password_confirmation: "fergie")
User.create(username: "pete", password: "eric", password_confirmation: "eric")

puts "Seeding petsitters"

Petsitter.create(user_id: 1, bio: "Hello, I am a full time dog walker in Brooklyn NYC. I worked as a zookeeper, in an animal rescue, and multiple vet clinics so your pet is safe with me!", photo: "https://images.pexels.com/photos/17267141/pexels-photo-17267141/free-photo-of-woman-posing-in-floral-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", city: "Brooklyn", day_rate: 85, currently_available: true, my_ideal_pet_sit: "I am available to do in-house pet sits, and board smaller dogs in my home.", full_name: "Beau Lazear")
Petsitter.create(user_id: 3, bio: "Loving caretaker of NYC's furballs!", photo: "https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", city: "Bronx", day_rate: 95, currently_available: true, my_ideal_pet_sit: "Open to all pet sits.", full_name: "Sarah Hubs")
Petsitter.create(user_id: 4, bio: "NYC pet guru, making tails wag happily 🐕", photo: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60", city: "Queens", day_rate: 105, currently_available: true, my_ideal_pet_sit: "Open to all pet sits and boarding requests.", full_name: "Fred Fergie")

puts "Seeding clients"

Client.create(user_id: 2, full_name: "Gerard Zengel", pet_information: "Three kitties named mimu, marmu, and seamu!", ideal_petsitter: "Someone who loves my kitties and can come once a day")
