class ClientsController < ApplicationController
    before_action :current_user

    def create
        client = Client.create(client_params)
        if client.valid?
            render json: client, status: :created
        else
            render json: { errors: client.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        clients = Client.all
        render json: clients
    end

    def show
        client = @current_user.client
        if client
            render json: client
        else
            render json: { error: "Not found" }, status: :not_found
        end
    end

    def update
        client = @current_user.client
        if client
            client.update(client_params)
            render json: client, status: :created
        else
            render json: { errors: client.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def client_params
        params.permit(:id, :photo, :ideal_petsitter, :pet_information, :user_id, :full_name)
    end
end
