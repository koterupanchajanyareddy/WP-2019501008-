import os

from flask import Flask, session, render_template, request
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))


# @app.route("/")
# def index():
#     return "Project 1: TODO"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sign_up", methods = ["GET","POST"])
def signup():
    if request.method == "POST":
        data = request.form
        username = data.get("username")
        password = data.get("password")
        print(user, email)
        return render_template("signup.html", details = [username, email])
    else:
        return render_template("signup.html", details = 0)

# @app.route("/sign_in")
# def signin():
#     return render_template("signin.html")
