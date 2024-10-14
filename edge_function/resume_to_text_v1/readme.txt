
Setup:
    1. Clone the function.
    2. create venv and activate venv.
        python3 -m venv venv
        source ./venv/bin/activate      (mac)
    3. install dependancy
        pip install -r requirements.txt
    4. run
        functions-framework-python --target hello_http

Run:
    functions-framework-python --target hello_http --port 8081

add runtime variable:
    gcloud functions deploy resume_to_text_v1 --update-env-vars FOO=bar

push function to G-Cloud:
    gcloud functions deploy resume_to_text_v1 --gen2 --runtime=python311 --region=northamerica-northeast2 --source=. --entry-point=hello_http --trigger-http --allow-unauthenticated

test:
    url: https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/resume_to_text_v1
    method: POST
    payload: {"url": "https://aetdssowoezhaepzhzag.supabase.co/storage/v1/object/public/resume-job-post/public/dileep-b c-ebf0f03f-cb4f-4b4a-b456-82da2e38c98e?t=2023-10-18T15:41:12.224Z"}