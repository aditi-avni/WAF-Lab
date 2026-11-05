<<<<<<< HEAD
# Student addition feature

from flask import Flask, request, render_template_string
import sqlite3

app = Flask(__name__)

def connect_db():
    return sqlite3.connect("students.db")

def create_table():
    con = connect_db()
    con.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            course TEXT,
            department TEXT
        )
    """)
    con.commit()
    con.close()

@app.route("/", methods=["GET", "POST"])
def home():
    con = connect_db()

    if request.method == "POST":
        name = request.form["name"]
        course = request.form["course"]
        department = request.form["department"]

        con.execute(
            "INSERT INTO students (name, course, department) VALUES (?, ?, ?)",
            (name, course, department)
        )
        con.commit()

    students = con.execute("SELECT * FROM students").fetchall()
    con.close()

    return render_template_string("""
        <h2>Student Information Management System</h2>

        <form method="POST">
            Name: <input name="name" required><br><br>
            Course: <input name="course" required><br><br>
            Department: <input name="department" required><br><br>
            <button type="submit">Add Student</button>
        </form>

        <h3>Student Records</h3>

        <table border="1" cellpadding="8">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Department</th>
            </tr>
            {% for s in students %}
            <tr>
                <td>{{ s[0] }}</td>
                <td>{{ s[1] }}</td>
                <td>{{ s[2] }}</td>
                <td>{{ s[3] }}</td>
            </tr>
            {% endfor %}
        </table>
    """, students=students)

if __name__ == "__main__":
    create_table()
    app.run(debug=True)
=======
# Student viewing feature feature-view
