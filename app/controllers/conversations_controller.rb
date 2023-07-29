class ConversationsController < ApplicationController

    def index
        conversations = Conversation.all
        if conversations
            render json: conversations
        else
            render json: { error: "Not found" }, status: :not_found
        end
    end

    def create
        conversation = Conversation.create(convo_params)
        if conversation.valid?
            render json: conversation, status: :created
        else
            render json: { errors: conversation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def convo_params
        params.require(:conversation).permit(
            :petsitter_id,
            :client_id
        )
    end
end