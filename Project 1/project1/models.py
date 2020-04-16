from flask_aqlalchemy import SQLAlchemy
from datetime import datatime

db = SQLAlchemy()

class Users(db.Model):
    __tablename = "USERS"
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = True)
    email_id = db.Column(db.String, primary_key = True)
    password = db.Column(db.String, nullable= False)
    timestamp = db.Column(db.DateTime, nullable = False)

    def __init__(self, first_name, last_name, email_id, password, timestamp):
        self.first_name = first_name
        self.last_name = last_name
        self.email_id = email_id
        self.password = password
        self.timestamp = datatime.now()