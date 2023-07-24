class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        puts user
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end   

    def update_petsitter
        user = User.find_by(id: params[:id])
        user.update(is_pet_sitter: true)
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
