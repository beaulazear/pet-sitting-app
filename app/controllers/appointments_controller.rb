class AppointmentsController < ApplicationController
  before_action :current_user, :associated_appointments
  
    def create
        appointment = @current_client.appointments.create(appointment_params)
        if appointment.valid?
            render json: appointment, status: :created
        else
            render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
      render json: @current_appointments
    end

    def update
      appointment = @current_appointments.find_by(id: params[:id])
      appointment.update(appointment_params)
      if appointment.valid?
        render json: appointment, status: :created
      else
        render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def accepted
      appointment = @current_appointments.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: true, declined: false)
        render json: appointment, status: :created
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    def declined
      appointment = @current_appointments.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: false, declined: true)
        render json: appointment, status: :created
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    # find by current user appointments instead of from Appointment, make a method in application controller called current user ... go from there ... notes from meeting with Ben, implemented this here already.

    def canceled
      appointment = @current_appointments.find_by(id: params[:id])
      if appointment
        appointment.update(canceled: true)
        render json: appointment
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    def destroy
      appointment = @current_appointments.find_by(id: params[:id])
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

    def associated_appointments
      if @current_petsitter && @current_client
        @current_appointments = @current_petsitter.appointments.concat(@current_client.appointments)
      elsif @current_client
        @current_appointments = @current_client.appointments
      else
        @current_appointments = @current_petsitter.appointments
      end
    end
end
