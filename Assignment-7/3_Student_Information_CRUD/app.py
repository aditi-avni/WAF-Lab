import sqlite3
from pathlib import Path
from flask import Flask, render_template, request, redirect, url_for, flash, abort

app = Flask(__name__)
app.secret_key = "week7-student-demo-key"
DATABASE = Path(__file__).with_name("students.db")

def get_db_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    with get_db_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                roll_no TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                department TEXT NOT NULL,
                email TEXT NOT NULL
            )
        """)

@app.route("/")
def index():
    with get_db_connection() as connection:
        students = connection.execute("SELECT * FROM students ORDER BY id DESC").fetchall()
    return render_template("index.html", students=students)

@app.route("/add", methods=["POST"])
def add_student():
    roll_no = request.form.get("roll_no", "").strip()
    name = request.form.get("name", "").strip()
    department = request.form.get("department", "").strip()
    email = request.form.get("email", "").strip()

    if not all([roll_no, name, department, email]):
        flash("All fields are required.")
        return redirect(url_for("index"))

    try:
        with get_db_connection() as connection:
            connection.execute(
                "INSERT INTO students (roll_no, name, department, email) VALUES (?, ?, ?, ?)",
                (roll_no, name, department, email)
            )
        flash("Student added successfully.")
    except sqlite3.IntegrityError:
        flash("That roll number already exists.")
    return redirect(url_for("index"))

@app.route("/edit/<int:student_id>", methods=["GET", "POST"])
def edit_student(student_id):
    with get_db_connection() as connection:
        student = connection.execute("SELECT * FROM students WHERE id = ?", (student_id,)).fetchone()
        if student is None:
            abort(404)

        if request.method == "POST":
            roll_no = request.form.get("roll_no", "").strip()
            name = request.form.get("name", "").strip()
            department = request.form.get("department", "").strip()
            email = request.form.get("email", "").strip()

            if not all([roll_no, name, department, email]):
                flash("All fields are required.")
                return render_template("edit.html", student=student)

            try:
                connection.execute(
                    "UPDATE students SET roll_no=?, name=?, department=?, email=? WHERE id=?",
                    (roll_no, name, department, email, student_id)
                )
                flash("Student updated successfully.")
                return redirect(url_for("index"))
            except sqlite3.IntegrityError:
                flash("That roll number is already used by another student.")

    return render_template("edit.html", student=student)

@app.route("/delete/<int:student_id>", methods=["POST"])
def delete_student(student_id):
    with get_db_connection() as connection:
        connection.execute("DELETE FROM students WHERE id = ?", (student_id,))
    flash("Student deleted.")
    return redirect(url_for("index"))

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
