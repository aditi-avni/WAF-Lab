from datetime import date
import re
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def appointment():
    errors = []
    confirmation = None

    if request.method == "POST":
        patient = request.form.get("patient", "").strip()
        doctor = request.form.get("doctor", "").strip()
        appointment_date = request.form.get("appointment_date", "").strip()
        contact = request.form.get("contact", "").strip()

        if not patient:
            errors.append("Patient name is required.")
        elif len(patient) > 60:
            errors.append("Patient name must be 60 characters or fewer.")

        if not doctor:
            errors.append("Doctor name is required.")

        try:
            parsed_date = date.fromisoformat(appointment_date)
            if parsed_date < date.today():
                errors.append("Appointment date cannot be in the past.")
        except ValueError:
            errors.append("Please enter a valid appointment date.")

        if not re.fullmatch(r"[0-9]{10}", contact):
            errors.append("Contact number must contain exactly 10 digits.")

        if not errors:
            confirmation = {
                "patient": patient,
                "doctor": doctor,
                "appointment_date": appointment_date,
                "contact": contact
            }

    return render_template("index.html", errors=errors, confirmation=confirmation)

if __name__ == "__main__":
    app.run(debug=True)
