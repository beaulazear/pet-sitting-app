class AppointmentsController < ApplicationController
  before_action :current_user
  
    def create
        appointment = Appointment.create(appointment_params)
        if appointment.valid?
            render json: appointment, status: :created
        else
            render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
      if @current_user.petsitter && @current_user.client
        appointments = @current_user.petsitter.appointments + @current_user.client.appointments
      elsif @current_user.petsitter
        appointments = @current_user.petsitter.appointments
      else
        appointments = @current_user.client.appointments
      end

      render json: appointments
    end

    def update
      appointment = @current_user.client.appointments.find_by(id: params[:id])
      appointment.update(appointment_params)
      if appointment.valid?
        render json: appointment, status: :created
      else
        render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def accepted
      appointment = @current_user.petsitter.appointments.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: true, declined: false)
        render json: appointment, status: :created
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    def declined
      appointment = @current_user.petsitter.appointments.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: false, declined: true)
        render json: appointment, status: :created
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    # review study guide in charlottes resrouce posts

    def canceled
      if @current_user.client
        appointment = @current_user.client.appointments.find_by(id: params[:id])
        if appointment
          appointment.update(canceled: true)
          render json: appointment
        else
          render json: { error: "Appointment not found" }, status: :not_found
        end        
      else @current_user.petsitter
        appointment = @current_user.petsitter.appointments.find_by(id: params[:id])
        if appointment
          appointment.update(canceled: true)
          render json: appointment
        else
          render json: { error: "Appointment not found" }, status: :not_found
        end
      end
    end

    def destroy
      appointment = Appointment.find_by(id: params[:id])
      if appointment
        appointment.destroy
        render json: appointment.client
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    private

    # wrap parameter rails .. params wrapper 

    def appointment_params
      params.require(:appointment).permit(:appointment_information, :start_date, :end_date, :boarding, :in_house, :petsitter_id, :client_id)
    end
end
