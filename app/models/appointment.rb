class Appointment < ApplicationRecord
    validates :start_date, presence: true
    validates :end_date, presence: true, date: { after_or_equal_to: :start_date }
    validates :appointment_information, presence: true
  
    belongs_to :client
    belongs_to :petsitter
  
    before_validation :ensure_dates_are_valid
  
    private
  
    def ensure_dates_are_valid
      if start_date && start_date < Date.current
        errors.add(:start_date, "Must be in the future")
      end
  
      if start_date && end_date && end_date < start_date
        errors.add(:end_date, "Must be after the start date")
      end
    end
  end
  