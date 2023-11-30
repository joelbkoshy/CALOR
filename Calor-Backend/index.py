from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import httpx
import traceback
import asyncio
from pymongo import MongoClient


app = Flask(__name__)
CORS(app)
client = MongoClient()

new_posts = [
    {
        "author": "Mike",
        "text": "Another post!",
        "tags": ["bulk", "insert"],
    },
    {
        "author": "Eliot",
        "title": "MongoDB is fun",
        "text": "and pretty easy too!",
    },
]

db = client.test
collection = db.users
result = collection.insert_many(new_posts)



async def forward_asr_request():
    # Define the target URL and headers for the external ASR service
    target_url = 'http://localhost:9000/asr?encode=true&task=transcribe&word_timestamps=false&output=txt'
    headers = {'accept': 'application/json'}

    try:
        # Extract audio_file from the request
        audio_file = request.files.get('audio_file')

        if audio_file:
            # Save the file locally (optional)
            save_path = os.path.join("local_audio_files", audio_file.filename)
            audio_file.save(save_path)
            # Create a dictionary with the file content
            files = {'audio_file': (audio_file.filename, open(save_path, 'rb'), audio_file.content_type)}
            async with httpx.AsyncClient(timeout=None) as client:
                # Make the request to the external ASR service
                print("Going to send the request")
                response = await client.post(target_url, files=files, headers=headers)
                print("The response: ", response.text)

                # Return the response from the external ASR service
                return response.text

        else:
            return jsonify({"error": "No audio file provided"}), 400

    except Exception as e:
        # Print the error message and return an error response
        traceback.print_exc()
        print("Error during ASR request:", str(e), " done!!!")
        return jsonify({"error": f"Error during ASR request: {str(e)}"}), 500

@app.route('/asr', methods=['POST'])
def asr_route():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(forward_asr_request())
    print("The result",result)
    return result

if __name__ == "__main__":
    port = int(os.environ.get("FLASK_PORT",8000))
    app.run(debug=True, port=port)
    