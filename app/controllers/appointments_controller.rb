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
      appointments = Appointment.all
      render json: appointments
    end

    def update
      appointment = Appointment.find_by(id: params[:id])
      appointment.update(appointment_params)
      if appointment.valid?
        render json: appointment, status: :created
      else
        render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def accepted
      appointment = Appointment.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: true, declined: false)
        render json: appointment, status: :created
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    def declined
      appointment = Appointment.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: false, declined: true)
        render json: appointment, status: :created
      else
        render json: { error: "Appointment not found" }, status: :not_found
      end
    end

    # find by current user appointments instead of from Appointment, make a method in application controller called current user ... go from there ... notes from meeting with Ben, implemented this here already.

    def canceled
      appointment = Appointment.find_by(id: params[:id])
      if appointment
        appointment.update(canceled: true)
        render json: appointment
      else
        render json: { error: "Appointment not found" }, status: :not_found
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

    # def associated_appointments
    #   if @current_petsitter && @current_client
    #     Appointment = @current_petsitter.appointments + @current_client.appointments
    #   elsif @current_client
    #     Appointment = @current_client.appointments
    #   else
    #     Appointment = @current_petsitter.appointments
    #   end

    #   puts Appointment
    # end
end
