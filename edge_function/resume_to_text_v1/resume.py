import re
import base64
import fitz 
import docx2txt

from pdfminer.high_level import extract_text
from pypdf import PdfReader
from autocorrect import Speller

supported_formats = {
    'PDF': 'PDF',
    'DOCX': 'DOCX',
    'TEXT': 'TEXT',
}


def clean_text(text):
    cleaned_text = re.sub(r'[\r\n]+|\s+', ' ', text).replace("\u0000", '')
    return cleaned_text.strip()

class ResumeProcessor:
    def __init__(self, input_file, formate):
        self.file = input_file
        self.formate = formate

    def process(self):
        resume_dict = self._read_resumes()
        return resume_dict


    def _read_resumes(self) -> dict:
            resume_text_data = None
            images = None
            if (self.formate == supported_formats['PDF']):
                try:
                    resume_text_data = clean_text(extract_text(self.file))
                    if resume_text_data == None or resume_text_data.strip() == '':
                        pdf_reader = PdfReader(self.file)
                        count = len(pdf_reader.pages)
                        pdf_output = []
                        for i in range(count):
                            page = pdf_reader.pages[i]
                            pdf_output.append(page.extract_text())
                        resume_text_data = " ".join(pdf_output) 
                    if resume_text_data == None or len(resume_text_data.strip()) < 500:
                        print('text extraction failed extracting images')
                        images = pdfToImage(self.file)
                except Exception as e:
                    print(e)
                    raise Exception('Pdf file parsing failed')
                           
            elif (self.formate == supported_formats['DOCX']):
                try:
                    resume_text_data = clean_text(docx2txt.process(self.file))
                except Exception as e:
                    print(e)
                    raise Exception('Docx file parsing failed')

            if(images != None) and len(images)!=0:
                return { "images":images, "text":None, "failed": False}
            elif (resume_text_data != None) and resume_text_data.strip() != '':
                return { "images":None, "text": remove_page_annotations(resume_text_data), "failed": False}
            else:
                return { "images":None, "text":None, "failed": True}

def pdfToImage (file):
    try:
        # pdf_file = fitz.open(file) 
        pdf_file = fitz.open(stream=file, filetype="pdf") 
        image_data_list = []
        # iterate over PDF pages 
        # print('pages:', len(pdf_file))
        for page_index in range(len(pdf_file)): 
            # get the page itself 
            page = pdf_file[page_index] 
            image_list = page.get_images()
            if len(image_list) < 1:
                image_data_list.append(convert_to_image(page))
            else:
                for image_index, img in enumerate(image_list, start=1): 
                    # get the XREF of the image 
                    xref = img[0] 
            
                    # extract the image bytes 
                    base_image = pdf_file.extract_image(xref) 
                    image_bytes = base_image["image"] 
            
                    # Append image data to the list
                    image_data_list.append(base64.b64encode(image_bytes).decode('utf-8'))
                    # # Append image data to the list

                    # # Save the image locally
                    # image_path = os.path.join(output_dir, f'image_page{page_index}_index{image_index}.{image_ext}')
                    # with open(image_path, 'wb') as f:
                    #     f.write(preprocessed_image_bytes)
    except:
        raise Exception('text to Image Failed')
    return image_data_list

def convert_to_image(page):
    try:
        zoom = 2 # to increase the resolution
        mat = fitz.Matrix(zoom, zoom)
        pix_byte = page.get_pixmap(matrix = mat).tobytes()
        return base64.b64encode(pix_byte).decode('utf-8')
    except Exception as e:
        print(e)

def remove_page_annotations(text):
    # Final refinement of the pattern to accurately match and remove all common page number formats and their surrounding symbols.
    pattern = re.compile(
        r'\b(Page\s\d+|Page\s\d+\s|\d+\s\|\s|\(\d+\)|-\d+-|\d+\s[-|])\b|\(\d+\)|-\d+-',
        re.IGNORECASE
    )
    # Remove the matched patterns from the text
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text

def spellCorrect():
    spell = Speller()
    # Auto-correct text
    corrected_text = spell(text)
    return corrected_text