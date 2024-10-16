Setup: 1. Clone the function. 2. Create a virtual environment and activate it.
`         python3 -m venv venv
        source ./venv/bin/activate      (mac)
        ` 3. Install dependencies.
`         pip install -r requirements.txt
        ` 4. Run the function.
`         functions-framework-python --target hello_http
        `

To run the function:
    ```
    functions-framework-python --target hello_http --port 8081
    ```

To add a runtime variable:
    ```
    gcloud functions deploy resume_to_text_v1 --update-env-vars FOO=bar
    ```

To push the function to G-Cloud:
    ```
    gcloud functions deploy nursera_resume_to_text_v1 --gen2 --runtime=python311 --region=northamerica-northeast2 --source=. --entry-point=hello_http --trigger-http --allow-unauthenticated
    ```

To test the function:
    - URL: https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/nursera_resume_to_text_v1
    - Method: POST
    - Payload:
      ```
      {
         "url": "https://aetdssowoezhaepzhzag.supabase.co/storage/v1/object/public/resume-job-post/public/dileep-b c-ebf0f03f-cb4f-4b4a-b456-82da2e38c98e?t=2023-10-18T15:41:12.224Z"
      }
      ```
