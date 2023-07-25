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
