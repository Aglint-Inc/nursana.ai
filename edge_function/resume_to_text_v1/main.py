from resume import ResumeProcessor, clean_text
from flask import make_response, jsonify
from enum import Enum
import functions_framework
import requests
import io


supported_formats = {
    'PDF': 'PDF',
    'DOCX': 'DOCX',
    'TEXT': 'TEXT',
}

ErrorType = {
    "SYSTEM_ERROR": "SYSTEM_ERROR",
    "URL_ERROR": "URL_ERROR",
    "UNSUPPORTED_FORMAT": "UNSUPPORTED_FORMAT",
    "TEXT_EXTRACTION_FAILED": "TEXT_EXTRACTION_FAILED",
    "TEXT_TO_IMAGE_FAILED": "TEXT_TO_IMAGE_FAILED",
}
    


def make_json_response(text=None, images=None, error=None, error_type=None):
    return jsonify({'text': text, 'images':images, 'error': error, 'error_type': error_type}) 

@functions_framework.http
def hello_http(request):
    headers = {"Access-Control-Allow-Origin": "*"}
    if request.method == 'POST':
        content_type = request.headers["content-type"]

        if content_type == "application/json":
            request_json = request.get_json(silent=True)
            url = None
            if request_json and "url" in request_json:
                url = request_json["url"]
                if (url is None or url.strip() == ''):
                    return make_response(make_json_response(error="Missing payload or wrong payload", error_type=ErrorType['URL_ERROR']), 415, headers)
                try:
                    data = read_file(url)
                    return make_response(make_json_response(text=data['text'],images=data['images']), 200, headers)
                except Exception as e:
                    errorType = file_read_error_mapper(str(e))
                    return make_response(make_json_response(error=f"{str(e)}",error_type=errorType ), 200, headers)
            else:
                return make_response(make_json_response(error="JSON is invalid, or missing 'url' or 'request_json' payload"), 200, headers)
    elif request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "content-type": "application/json"
        }
        return ("", 204, headers)
    else:
        return make_response(make_json_response(error='Method not Allowed!'), 401, headers)


def read_file(url):
    if (url is None):
        return None
    response = requests.get(url)
    try:
        response.raise_for_status()
    except:
        error_details = response.json()
        error_details['Content-Type']= response.headers["Content-Type"]
        error_details['url']= url
        print('Request failed: ', error_details)
        raise Exception(error_details)  
    formate = None
    if (response.headers['Content-Type'] == 'application/pdf'):
        formate = supported_formats["PDF"]
    elif (response.headers['Content-Type'] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'):
        formate = supported_formats["DOCX"]
    elif (response.headers['Content-Type'] in ['text/plain', 'text/plain;charset=UTF-8']):
        formate = supported_formats["TEXT"]
        return { "images":None, "text":clean_text(response.content.decode('utf-8')), "failed": True}
    else:
        raise Exception('File Formate not Supported')
    if (formate != None):
        resume_data = io.BytesIO(response.content)

        processor = ResumeProcessor(resume_data, formate)

        success = processor.process()
        if (success["failed"]!=None):
            return success
        raise Exception(f'Text Extraction Failed for file type {formate}')
    raise Exception('File Formate not Supported')

def file_read_error_mapper(error_message:str):
    if 'File Formate not Supported' in error_message:
        return ErrorType['UNSUPPORTED_FORMAT']
    elif 'Text Extraction Failed' in error_message:
        return ErrorType['TEXT_EXTRACTION_FAILED']
    elif 'text to Image Failed' in error_message:
        return ErrorType['TEXT_EXTRACTION_FAILED']
    else:
        return ErrorType['SYSTEM_ERROR']