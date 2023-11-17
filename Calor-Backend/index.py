from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

app=Flask(__name__)

if __name__=="__main__" :
    port=int(os.environ.get("FLASK_PORT",5000))
    print(port)
    app.run(debug=True,port=port)