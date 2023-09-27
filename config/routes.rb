Rails.application.routes.draw do
  
  resources :appointments, only: [:create, :update, :index, :destroy]
  resources :clients, only: [:index, :update, :create]
  resources :petsitters, only: [:index, :create, :update, :show]
  resources :users, only: :show
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  get "/petsitter", to: "petsitters#show"
  patch "/petsitters/:id/availability", to: "petsitters#update_availability"

  get "/client", to: "clients#show"

  get "/appointments/:id/accepted", to: "appointments#accepted"
  get "/appointments/:id/declined", to: "appointments#declined"
  get "/appointments/:id/canceled", to: "appointments#canceled"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
