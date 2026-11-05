import sqlite3
from pathlib import Path
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "week7-employee-demo-key"
DATABASE = Path(__file__).with_name("employees.db")

def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    with get_db_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                department TEXT NOT NULL,
                designation TEXT NOT NULL,
                email TEXT NOT NULL,
                salary REAL NOT NULL
            )
        """)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        department = request.form.get("department", "").strip()
        designation = request.form.get("designation", "").strip()
        email = request.form.get("email", "").strip()
        salary_text = request.form.get("salary", "").strip()

        try:
            salary = float(salary_text)
            if salary <= 0:
                raise ValueError
        except ValueError:
            flash("Enter a valid salary greater than zero.")
            return redirect(url_for("index"))

        if not all([name, department, designation, email]):
            flash("All fields are required.")
            return redirect(url_for("index"))

        with get_db_connection() as connection:
            connection.execute(
                """INSERT INTO employees (name, department, designation, email, salary)
                   VALUES (?, ?, ?, ?, ?)""",
                (name, department, designation, email, salary)
            )
        flash("Employee details saved successfully.")
        return redirect(url_for("index"))

    with get_db_connection() as connection:
        employees = connection.execute("SELECT * FROM employees ORDER BY id DESC").fetchall()
    return render_template("index.html", employees=employees)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
