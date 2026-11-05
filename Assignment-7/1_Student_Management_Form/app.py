from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def student():
    errors = []
    student = None

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()

        if not name:
            errors.append("Student name is required.")
        elif len(name) > 60:
            errors.append("Student name must be 60 characters or fewer.")

        if not department:
            errors.append("Department is required.")
        elif len(department) > 60:
            errors.append("Department must be 60 characters or fewer.")

        if not errors:
            student = {"name": name, "department": department}

    return render_template("index.html", errors=errors, student=student)

if __name__ == "__main__":
    app.run(debug=True)
