import subprocess
import sys

# Install pdfplumber
subprocess.check_call([sys.executable, "-m", "pip", "install", "pdfplumber", "-q"])

import pdfplumber

with pdfplumber.open('AyushRaj1.pdf') as pdf:
    for i, page in enumerate(pdf.pages):
        text = page.extract_text()
        if text:
            print(text)
