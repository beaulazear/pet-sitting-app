class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :authorized

  private

  def authorized
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  def current_user
    @current_user = User.find_by(id: session[:user_id])

    if @current_user.petsitter
      @current_petsitter = @current_user.petsitter
    end

    if @current_user.client
      @current_client = @current_user.client
    end
  end

end
