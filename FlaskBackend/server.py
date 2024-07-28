from flask import Flask, request, jsonify
from flask_cors import CORS

from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError
from botocore.exceptions import NoCredentialsError, PartialCredentialsError


from contextlib import closing
import os
import sys
import subprocess
from tempfile import gettempdir
import time

session = Session(profile_name="default")
app = Flask(__name__)
CORS(app)
def read_text_file(file_path): #extracting text for synthesis
    try:
        with open(file_path, 'r') as file:
            # Read the entire content of the file
            content = file.read()
            return content
    except FileNotFoundError:
        print(f"The file {file_path} does not exist.")
    except IOError:
        print(f"An error occurred while reading the file {file_path}.")

def generate_URL(bucket_name, obj_key, expiration = 3600):
    S3 = session.client('s3')
    try:
        response = S3.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucket_name, 'Key': obj_key},
                                                    ExpiresIn=expiration)
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"Error: {e}")
        return None
    return response

    


@app.route('/upload', methods=['POST'])

def upload_file():

    if 'file' not in request.files and 'text' not in request.json:
        return jsonify({"error": "No file or text input provided"}), 400


    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        if file.filename.endswith('.txt'):
            file_path = os.path.join('uploads', file.filename)
            file.save(file_path)
            
            text_content = read_text_file(file_path)
    elif request.is_json:
        data = request.get_json()
        if 'text' in data:
            text_content = data['text']
        else:
            return jsonify({"error": "No text input provided"}), 400
    
   
    #Setting up sessions
    
    polly = session.client("polly")
    

    try:
        response = polly.start_speech_synthesis_task(Engine='standard', OutputFormat = 'mp3', OutputS3BucketName='polly-test-bucket1', Text= text_content, VoiceId = 'Aditi')
    
    except (BotoCoreError, ClientError) as error:
    # The service returned an error, exit gracefully
        print(error)
        sys.exit(-1)

    TaskID = response['SynthesisTask']['TaskId']


    while True:

        try:
            task_response = polly.get_speech_synthesis_task(TaskId= TaskID)
        except (BotoCoreError, ClientError) as error:
            return jsonify({"error": str(error)}), 500
        
        task_response_status = task_response['SynthesisTask']['TaskStatus']
        if task_response_status == 'completed':
            OBJ_KEY = TaskID + ".mp3"
            output_uri = generate_URL('polly-test-bucket1', OBJ_KEY)
            return jsonify({"message": "Task Completed", "uri": output_uri}), 200
        else:
            time.sleep(5)



if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)


