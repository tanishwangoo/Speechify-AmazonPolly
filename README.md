
# Text-to-Speech Application

Welcome to the Text-to-Speech Application, an innovative solution for converting text and text files into natural-sounding speech using AWS Polly. This application supports multiple languages and voice options, allowing for a highly customizable user experience.

![Demo](https://via.placeholder.com/800x200.png?text=Text-to-Speech+Application+Demo)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Voice Options](#voice-options)
- [Data Analytics](#data-analytics)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project leverages AWS Polly's advanced text-to-speech capabilities to convert textual input into speech. It supports multiple languages and a variety of voices, making it suitable for diverse applications such as educational tools, accessibility enhancements, and more.

## Features

- **Multiple Input Options**: Convert plain text or text files to speech.
- **Voice Selection**: Choose from a wide range of male and female voices.
- **Language Support**: Supports multiple languages.
- **Real-Time Processing**: Quick conversion with AWS Polly.
- **Downloadable Output**: Get your synthesized speech as downloadable MP3 files.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7+
- Node.js and npm
- AWS account with access to AWS Polly
- AWS CLI configured with appropriate permissions

## Installation

1. **Clone the Repository**

\`\`\`bash
git clone https://github.com/yourusername/text-to-speech-app.git
cd text-to-speech-app
\`\`\`

2. **Backend Setup**

\`\`\`bash
# Create a virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

3. **Frontend Setup**

\`\`\`bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
\`\`\`

4. **Start the Flask Server**

\`\`\`bash
# In a separate terminal, start the Flask server
cd ..
export FLASK_APP=app.py
flask run
\`\`\`

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Select either the "Text" or "Files" option.
3. Enter your text or upload a text file.
4. Choose a voice and language.
5. Click the "Convert" button to generate the speech.
6. Download the generated MP3 file from the provided link.

## API Endpoints

### `/voices` [GET]

Fetches available voices categorized by gender.

**Response:**

\`\`\`json
{
    "Male": [
        {"Name": "Matthew", "SupportedEngines": ["standard", "neural"]},
        {"Name": "Brian", "SupportedEngines": ["standard"]}
    ],
    "Female": [
        {"Name": "Joanna", "SupportedEngines": ["standard", "neural"]},
        {"Name": "Emma", "SupportedEngines": ["standard"]}
    ]
}
\`\`\`

### `/selectedVoice` [POST]

Sets the selected voice and engine for speech synthesis.

**Request:**

\`\`\`json
{
    "Voice": "Joanna",
    "Engine": "standard"
}
\`\`\`

**Response:**

\`\`\`json
{
    "selectedVoice": "Joanna"
}
\`\`\`

### `/upload` [POST]

Uploads text or a text file for conversion to speech.

**Request (Text):**

\`\`\`json
{
    "text": "Hello, world!"
}
\`\`\`

**Request (File):**

Upload a `.txt` file using multipart/form-data.

**Response:**

\`\`\`json
{
    "message": "Task Completed",
    "uri": "https://your-bucket.s3.amazonaws.com/task-id.mp3"
}
\`\`\`

## Voice Options

The application supports a variety of voices provided by AWS Polly. Here’s a breakdown of the voices and their supported engines:

- **English (US)**:
  - Male: Matthew, Brian
  - Female: Joanna, Emma
- **English (UK)**:
  - Male: Brian
  - Female: Emma
- **Spanish (ES)**:
  - Male: Enrique
  - Female: Conchita


## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
