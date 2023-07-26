class AppointmentsController < ApplicationController

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

    def accepted
      appointment = Appointment.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: true, declined: false)
        render json: appointment, status: :created
      else
        render json: { error: "Bird not found" }, status: :not_found
      end
    end

    def declined
      appointment = Appointment.find_by(id: params[:id])
      if appointment
        appointment.update(accepted: false, declined: true)
        render json: appointment, status: :created
      else
        render json: { error: "Bird not found" }, status: :not_found
      end
    end

    def cancel
      appointment = Appointment.find_by(id: params[:id])
      if appointment
        appointment.update(canceled: true)
        render json: appointment, status: :created
      else
        render json: { error: "Bird not found" }, status: :not_found
      end
    end

    private

    def appointment_params
        params.require(:appointment).permit(
          :appointment_information,
          :start_date,
          :end_date,
          :boarding,
          :in_house,
          :petsitter_id,
          :client_id
        )
      end
      
end
