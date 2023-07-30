class PetsittersController < ApplicationController

    def create
        pet_sitter = Petsitter.create(pet_sitter_params)
        if pet_sitter.valid?
            render json: pet_sitter, include: :user, status: :created 
        else 
            render json: { errors: pet_sitter.errors.full_messages }, status: :unprocessable_entity
        end       
    end

    def index
        pet_sitters = Petsitter.all
        render json: pet_sitters, status: :created
    end

    def show
        petsitter = Petsitter.find_by(user_id: session[:user_id])
        if petsitter
          render json: petsitter
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    def update
        petsitter = Petsitter.find_by(id: params[:id])
        if petsitter
            petsitter.update(pet_sitter_params)
            render json: petsitter, status: :created
        else
            render json: { error: "unprocessable entity" }, status: :unprocessable_entity
        end
    end

    private

    def pet_sitter_params
        params.permit(:bio, :photo, :city, :full_name, :my_ideal_pet_sit, :day_rate, :id, :user_id, :petsitter, :currently_available)
    end
end
