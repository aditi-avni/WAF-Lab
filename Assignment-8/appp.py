
from flask import Flask, request, render_template_string
import sqlite3

app = Flask(__name__)

def connect_db():
    return sqlite3.connect("courses.db")

def create_table():
    con = connect_db()
    con.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student TEXT,
            course TEXT
        )
    """)
    con.commit()
    con.close()

@app.route("/", methods=["GET", "POST"])
def home():
    con = connect_db()

    if request.method == "POST":
        student = request.form["student"]
        course = request.form["course"]

        con.execute(
            "INSERT INTO registrations (student, course) VALUES (?, ?)",
            (student, course)
        )
        con.commit()

    records = con.execute("SELECT * FROM registrations").fetchall()
    con.close()

    return render_template_string("""
        <h2>Online Course Registration</h2>

        <form method="POST">
            Student Name: <input name="student" required><br><br>

            Course:
            <select name="course">
                <option>Python</option>
                <option>Java</option>
                <option>Web Development</option>
                <option>Machine Learning</option>
            </select><br><br>

            <button type="submit">Register</button>
        </form>

        <h3>Registered Students</h3>

        {% for r in records %}
            <p>{{ r[1] }} - {{ r[2] }}</p>
        {% endfor %}
    """, records=records)

if __name__ == "__main__":
    create_table()
    app.run(debug=True)
