class ClientsController < ApplicationController

    def create
        client = Client.create(client_params)
        if client.valid?
            render json: client, status: :created
        else
            render json: { error: "Unprocessable Entity" }, status: :unprocessable_entity
        end
    end

    def index
        clients = Client.all
        render json: clients
    end

    def show
        client = Client.find_by(user_id: session[:user_id])
        if client
            render json: client
        else
            render json: { error: "Not found" }, status: :not_found
        end
    end

    private

    def client_params
        params.permit(:id, :photo, :ideal_petsitter, :pet_information, :user_id, :full_name)
    end
end
