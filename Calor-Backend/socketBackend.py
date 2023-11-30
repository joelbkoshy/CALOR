from flask import Flask, request, jsonify
from flask_socketio import join_room,leave_room,send,SocketIO
import random
from string import ascii_uppercase
import os

# load_dotenv("Calor-Backend/.env")/
app = Flask(__name__)
socketio = SocketIO(app)


if __name__=="__main__":
    port=int(os.environ.get("SOCKET_PORT",4000))
    socketio.run(app,debug=True,port=port)