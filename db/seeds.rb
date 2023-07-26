# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: "beau", password: "bark", password_confirmation: "bark")

Petsitter.create(user_id: 1, bio: "Hello, I am a full time dog walker in Brooklyn NYC. I worked as a zookeeper, in an animal rescue, and multiple vet clinics so your pet is safe with me!", photo: "https://images.pexels.com/photos/17267141/pexels-photo-17267141/free-photo-of-woman-posing-in-floral-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", city: "Brooklyn", day_rate: 85, currently_available: true, my_ideal_pet_sit: "I am available to do in-house pet sits, and board smaller dogs in my home.", full_name: "Beau Lazear")
