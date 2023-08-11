class ConversationsController < ApplicationController
    before_action :current_user

    def index
        conversations = Conversation.all
        render json: conversations
    end

    def create
        conversation = Conversation.create(convo_params)
        if conversation.valid?
            render json: conversation, status: :created
        else
            render json: { errors: conversation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        conversation = Conversation.find_by(id: params[:id])
        if conversation
            conversation.destroy
            render json: conversation
        else
            render json: { error: "not found" }, status: :not_found
        end
    end

    def update
        conversation = Conversation.find_by(id: params[:id])
        if conversation
            conversation.update(update_title_params)
            render json: conversation, status: :created
        else
            render json: { errors: conversation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def convo_params
        params.require(:conversation).permit(:petsitter_id, :client_id, :conversation_title)
    end

    def update_title_params
        params.require(:conversation).permit(:conversation_title)
    end
end