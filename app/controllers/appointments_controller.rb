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

      if appointments
        render json: appointments
      else
        render json: { error: "No appointments found" }, status: :not_found
      end
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
    
    def destroy
      appointment = @current_user.client.appointments.find_by(id: params[:id])
      if appointment
        appointment.destroy
        head :no_content
      else
        render json: { error: "Appointment not found" }, status: :not_found
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

    def canceled
      appointments = []
    
      if @current_user.client
        appointments += @current_user.client.appointments
      end
    
      if @current_user.petsitter
        appointments += @current_user.petsitter.appointments
      end
    
      appointment = appointments.find { |app| app.id == params[:id].to_i }
    
      if appointment
        appointment.update(canceled: true)
        render json: appointment, status: :created
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    private

    # wrap parameter rails .. params wrapper 

    def appointment_params
      params.require(:appointment).permit(:appointment_information, :start_date, :end_date, :boarding, :in_house, :petsitter_id, :client_id, :canceled)
    end
end
