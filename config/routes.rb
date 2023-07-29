Rails.application.routes.draw do
  
  # resources :appointments
  # resources :clients
  # resources :petsitters
  # resources :users, only: [:create, :index]


  get "/me", to: "users#show"
  get "/users", to: "users#index"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/petsitters", to: "petsitters#index"
  post "/petsitters", to: "petsitters#create"
  get "/petsitter", to: "petsitters#show"

  post "/clients", to: "clients#create"
  get "/clients", to: "clients#index"
  get "/client", to: "clients#show"
  
  post "/appointments", to: "appointments#create"
  get "/appointments", to: "appointments#index"
  get "/appointments/:id/accepted", to: "appointments#accepted"
  get "/appointments/:id/declined", to: "appointments#declined"
  get "/appointments/:id/canceled", to: "appointments#cancel"



  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
