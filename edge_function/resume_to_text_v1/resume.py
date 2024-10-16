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
    """
    Cleans the given text by removing line breaks, extra spaces, and null characters.

    Args:
        text (str): The text to be cleaned.

    Returns:
        str: The cleaned text.
    """
    cleaned_text = re.sub(r'[\r\n]+|\s+', ' ', text).replace("\u0000", '')
    return cleaned_text.strip()

class ResumeProcessor:
    """
    A class that processes resumes.
    Args:
        input_file (str): The path to the input file.
        formate (str): The format of the input file.
    Methods:
        process(): Processes the resume and returns a dictionary.
    """
    def __init__(self, input_file, formate):
        self.file = input_file
        self.formate = formate
    def process(self):
        """
        Processes the resume and returns a dictionary.
        Returns:
            dict: A dictionary containing the processed resume data.
                If text extraction fails, the dictionary will contain images.
                If both text extraction and image extraction fail, the dictionary will indicate failure.
        """
        resume_dict = self._read_resumes()
        return resume_dict
    def _read_resumes(self) -> dict:
            """
            Reads resumes and extracts text data or images based on the format of the file.
            Returns:
                A dictionary containing the extracted data:
                - If images are extracted, the dictionary will have the key "images" with a list of images, and the keys "text" and "failed" will be None.
                - If text data is extracted, the dictionary will have the key "text" with the extracted text, and the keys "images" and "failed" will be None.
                - If extraction fails, the dictionary will have the key "failed" set to True, and the keys "images" and "text" will be None.
            """
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
                    raise Exception('Text Extraction Failed: Pdf file parsing failed')
                           
            elif (self.formate == supported_formats['DOCX']):
                try:
                    resume_text_data = clean_text(docx2txt.process(self.file))
                except Exception as e:
                    print(e)
                    raise Exception('Text Extraction Failed: Docx file parsing failed')

            if(images != None) and len(images)!=0:
                return { "images":images, "text":None, "failed": False}
            elif (resume_text_data != None) and resume_text_data.strip() != '':
                return { "images":None, "text": remove_page_annotations(resume_text_data), "failed": False}
            else:
                return { "images":None, "text":None, "failed": True}

def pdfToImage (file):
    """
    Converts a PDF file to a list of image data.
    Args:
        file (str): The path to the PDF file.
    Returns:
        list: A list of image data in base64-encoded format.
    Raises:
        Exception: If the conversion from text to image fails.
    """
    try:
        pdf_file = fitz.open(stream=file, filetype="pdf") 
        image_data_list = []
        for page_index in range(len(pdf_file)): 
            page = pdf_file[page_index] 
            image_list = page.get_images()
            if len(image_list) < 1:
                image_data_list.append(convert_to_image(page))
            else:
                for image_index, img in enumerate(image_list, start=1): 
                    xref = img[0] 
                    base_image = pdf_file.extract_image(xref) 
                    image_bytes = base_image["image"] 
                    # Append image data to the list
                    image_data_list.append(base64.b64encode(image_bytes).decode('utf-8'))
    except:
        raise Exception('text to Image Failed')
    return image_data_list

def convert_to_image(page):
    """
    Converts a PDF page to an image and returns it as a base64 encoded string.

    Args:
        page (fitz.Page): The PDF page to convert.

    Returns:
        str: The base64 encoded string representation of the image.

    Raises:
        Exception: If an error occurs during the conversion process.
    """
    try:
        zoom = 2 # to increase the resolution
        mat = fitz.Matrix(zoom, zoom)
        pix_byte = page.get_pixmap(matrix = mat).tobytes()
        return base64.b64encode(pix_byte).decode('utf-8')
    except Exception as e:
        print(e)

def remove_page_annotations(text):
    """
    Removes common page number formats and their surrounding symbols from the given text.

    Args:
        text (str): The input text from which page annotations will be removed.

    Returns:
        str: The cleaned text with page annotations removed.
    """
    # Final refinement of the pattern to accurately match and remove all common page number formats and their surrounding symbols.
    pattern = re.compile(
        r'\b(Page\s\d+|Page\s\d+\s|\d+\s\|\s|\(\d+\)|-\d+-|\d+\s[-|])\b|\(\d+\)|-\d+-',
        re.IGNORECASE
    )
    # Remove the matched patterns from the text
    cleaned_text = re.sub(pattern, '', text)
    return cleaned_text

def spellCorrect(text:str):
    """
    Corrects the spelling of the given text using a spell checker.

    Args:
        text (str): The input text from which spell to fix.

    Returns:
        str: The corrected text.
    """
    spell = Speller()
    # Auto-correct text
    corrected_text = spell(text)
    return corrected_text