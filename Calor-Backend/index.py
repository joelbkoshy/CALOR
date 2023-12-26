import datetime
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import httpx
import traceback
import asyncio
from pymongo import MongoClient,DESCENDING
import uuid
import google.generativeai as genai
import os

# set your __Secure-1PSID value to key
# token = 'dwgz9hbe6wWwR0o9qy_5DJbo2znNxcMxUaN_kYsAVHURp86e1FH94PBF_PiQOELKCV2KKQ.'

genai.configure(api_key=os.environ.get("GENAI_API_KEY"))

# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }
]

model = genai.GenerativeModel(model_name="gemini-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)



app = Flask(__name__)
CORS(app)
client = MongoClient()


db = client.test
collection = db.users




async def forward_asr_request():
    # Define the target URL and headers for the external ASR service
    target_url = 'http://localhost:9000/asr?encode=true&task=transcribe&word_timestamps=false&output=txt'
    headers = {'accept': 'application/json'}
 
    try:
        # Extract audio_file from the request
        audio_file = request.files.get('audio_file')
        chat_id = request.form.get('chat_id')
        if audio_file:
            save_path = os.path.join("local_audio_files", audio_file.filename)
            audio_file.save(save_path)
            files = {'audio_file': (audio_file.filename, open(save_path, 'rb'), audio_file.content_type)}
            async with httpx.AsyncClient(timeout=None) as client:
                print("Going to send the request")
                response = await client.post(target_url, files=files, headers=headers)
                response_text = response.text
                prompt_parts = [  " ",
  "input: Act like a therapist, being friendly to the user, and asking his concerns seriously like his or hers best friend",
  "output: "]   
                prompt_parts.append(f"input : {response_text}")
                prompt_parts.append("output : ")
                Calorresponse = model.generate_content(prompt_parts)
                Calorresponse=Calorresponse.text
        #         print("Current Working Directory:", os.getcwd())
                
        #         with open('D:\\MCA\\5th_TRIMESTER\\SPECIALIZATION_PROJECT\\CALOR\\Calor-Backend\\models\\distilbert_model.pkl', 'rb') as model_file, \
        #         open('D:\\MCA\\5th_TRIMESTER\\SPECIALIZATION_PROJECT\\CALOR\\Calor-Backend\\models\\distilbert_tokenizer.pkl', 'rb') as tokenizer_file, \
        #         open('D:\\MCA\\5th_TRIMESTER\\SPECIALIZATION_PROJECT\\CALOR\\Calor-Backend\\models\\responses.pkl', 'rb') as responses_file:
        #          loaded_model = pickle.load(model_file)
        #          loaded_tokenizer = pickle.load(tokenizer_file)
        #          loaded_responses = pickle.load(responses_file)
        #    # Test the loaded model and tokenizer with a longer sentence
        #          input_ids = loaded_tokenizer.encode(response_text, return_tensors='pt', max_length=512, truncation=True)

        #         with torch.no_grad():
        #          output = loaded_model(input_ids)

        #         probs = torch.softmax(output.logits, dim=1)
        #         predicted_class = torch.argmax(probs).item()

        #     # Get the predicted response using the predicted class as an index
        #         predicted_response = loaded_responses[predicted_class]

            # Save the response text as a message in MongoDB
                message_id = str(uuid.uuid4())
                current_time = datetime.datetime.utcnow()
        
                message = {
                'message_id': message_id,
                'user_message': response_text,
                'calor_message': Calorresponse,
                'timestamp': current_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
                }

            # Find the document with the given chat_id or create a new one
                query = {'chat_id': chat_id}
                update = {'$push': {'messages': message}, '$setOnInsert': {'createdAt': datetime.datetime.utcnow()}}
                collection.update_one(query, update, upsert=True)

            return jsonify({"message_id": message_id, "response_text": response_text,"calor_mesaage":Calorresponse})
        else:
            return jsonify({"error": "No audio file provided"}), 400

    except Exception as e:
        traceback.print_exc()
        print("Error during ASR request:", str(e), " done!!!")
        return jsonify({"error": f"Error during ASR request: {str(e)}"}), 500

@app.route('/asr', methods=['POST'])
def asr_route():
    print("Going to send request",request)
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(forward_asr_request())
    return result

@app.route('/new_message/<string:chat_id>',methods=['POST'])
def new_message(chat_id):
    try:
        query ={'chat_id':chat_id}
        prompt_parts = [  " ",
  "input: Act like a therapist, being friendly to the user, and asking his concerns seriously like his or hers best friend",
  "output: "]   
        prompt_parts.append(f"input : {request.json.get('inputMessage')}")
        prompt_parts.append("output : ")
        Calorresponse = model.generate_content(prompt_parts)
        Calorresponse=Calorresponse.text
        message_id = str(uuid.uuid4())
        current_time = datetime.datetime.utcnow()
        
        message = {
        'message_id': message_id,
        'user_message': request.json.get('inputMessage'),
        'calor_message': Calorresponse,
        'timestamp': current_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        }

        query = {'chat_id': chat_id}
        update = {'$push': {'messages': message}, '$setOnInsert': {'createdAt': datetime.datetime.utcnow()}}
        collection.update_one(query, update, upsert=True)
        print({"message_id": message_id, "response_text": request.json.get('inputMessage'),"calor_message":Calorresponse})
        return jsonify({"message_id": message_id, "response_text": request.json.get('inputMessage'),"calor_message":Calorresponse})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Error creating chat: {str(e)}"}), 500
    

@app.route('/new_chat',methods=['POST'])
def new_Chat():
    try:
        data=request.json
        chat_id = str(uuid.uuid4())
        data['chat_id'] = chat_id
        collection.insert_one(data)
        data.pop('_id', None)
        print(data)
        return jsonify(data), 201
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Error creating chat: {str(e)}"}), 500
    
@app.route('/getChats',methods=['GET'])
def get_chats():
    data=list(collection.find({},{'_id': 0}).sort('createdAt', DESCENDING))
    return  data

@app.route('/')
def home():
    return 'Welcome to My Chat Application!'

@app.route('/fetch_chat/<string:chat_id>', methods=['GET'])
def fetch_chat_messages(chat_id):
    try:
        # Find the document with the given chat_id
        query = {'chat_id': chat_id}
        chat_document = collection.find_one(query)
        if chat_document:
            # Extract the 'messages' field from the chat document
            messages = chat_document.get('messages', [])
            return jsonify(messages)
        else:
            return jsonify({"error": "Chat not found"}), 404

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"Error fetching chat messages: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("FLASK_PORT",8800))
    app.run(debug=True, port=port)
    