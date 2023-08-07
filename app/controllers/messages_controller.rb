class MessagesController < ApplicationController
    before_action :current_user

    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = @current_user.messages.create(message_params)
        if message.valid?
            render json: message, status: :created
        else
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def message_params
        params.require(:message).permit(:conversation_id, :user_id, :body)
    end
end