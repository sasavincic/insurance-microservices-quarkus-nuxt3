FROM python:3.7

COPY ["requirements.txt", "main.py", "./"]

RUN pip install --upgrade pip \
    pip install -r requirements.txt

CMD ["python3", "main.py"]