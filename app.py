print("DEBUG: app.py started")
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='static', template_folder='templates')

# MongoDB connection
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)

db = client['university_db']
students_collection = db['students']

# Home page route
@app.route('/')
def index():
    return render_template('index.html')

# Get all students
@app.route('/api/students', methods=['GET'])
def get_students():
    students = list(students_collection.find())
    for s in students:
        s['_id'] = str(s['_id'])  # Convert ObjectId to string for JSON
    return jsonify(students)

# Add a new student
@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'No data received'}), 400

    required = ['name', 'student_id', 'course', 'email']
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing fields'}), 400

    if students_collection.find_one({'student_id': data['student_id']}):
        return jsonify({'error': 'Student ID already exists'}), 409

    new_student = {
        'name': data['name'],
        'student_id': data['student_id'],
        'course': data['course'],
        'email': data['email']
    }

    result = students_collection.insert_one(new_student)
    new_student['_id'] = str(result.inserted_id)

    return jsonify(new_student), 201

# Delete a student
@app.route('/api/students/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    result = students_collection.delete_one({'student_id': student_id})

    if result.deleted_count == 0:
        return jsonify({'error': 'Student not found'}), 404

    return jsonify({'message': 'Deleted'}), 200

# Test route
@app.route('/test')
def test():
    return "App is working!"

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)