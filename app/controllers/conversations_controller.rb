class ConversationsController < ApplicationController
    before_action :current_user, :associated_conversations

    def index
        render json: @current_conversations
    end

    def create
        conversation = @current_client.conversations.create(convo_params)
        if conversation.valid?
            render json: conversation, status: :created
        else
            render json: { errors: conversation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        conversation = @current_conversations.find_by(id: params[:id])
        if conversation
            conversation.destroy
            render json: conversation
        else
            render json: { error: "not found" }, status: :not_found
        end
    end

    def update
        conversation = @current_conversations.find_by(id: params[:id])
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

    def associated_conversations
        if @current_petsitter && @current_client
          @current_conversations = @current_petsitter.conversations.concat(@current_client.conversations)
        elsif @current_client
          @current_conversations = @current_client.conversations
        else
          @current_conversations = @current_petsitter.conversations
        end
      end
end