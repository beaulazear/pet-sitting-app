class MessagesController < ApplicationController

    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.create(message_params)
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