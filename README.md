# URL Shortener Microservice

This project is part of the freeCodeCamp Back End Development and APIs curriculum. It is a URL Shortener Microservice that allows users to shorten long URLs and redirect to the original URLs using the shortened versions.

[Project Demo](https://dry-brushlands-17298-607b22fd3d43.herokuapp.com/)

## Table of Contents

- Introduction
- Features
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- Usage
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- Troubleshooting
- Contributing
- License

## Introduction

The URL Shortener Microservice is a web application that provides a simple API for shortening URLs. Users can submit a long URL and receive a shortened version, which can then be used to redirect to the original URL.

You can view the project requirements and test page [here](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice).

## Features

- **Shorten URLs**: Submit a long URL and receive a shortened version.
- **Redirect to Original URL**: Use the shortened URL to redirect to the original URL.
- **View All Shortened URLs**: View a list of all shortened URLs.
- **Clear All URLs**: Clear all stored URLs (for testing purposes).

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing URLs.
- **Mongoose**: ODM for MongoDB.
- **Body-Parser**: Middleware for parsing request bodies.
- **Cors**: Middleware for enabling CORS.
- **Dotenv**: Module for loading environment variables.

## Setup and Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/url-shortener-microservice.git
    cd url-shortener-microservice
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    ```

4. **Start the server**:
    ```bash
    npm start
    ```

5. **Open the application**:
    Open your web browser and go to [`http://localhost:3000`](http://localhost:3000).

## Usage

- **Shorten URL**: Submit a POST request to `/api/shorturl` with the URL to be shortened.
- **Redirect to Original URL**: Access the shortened URL at `/api/shorturl/:short_url` to be redirected to the original URL.
- **View All Shortened URLs**: Click the "Check All URLs" button on the homepage to view all shortened URLs.
- **Clear All URLs**: Send a DELETE request to `/api/a-hacker-cleared-my-db` to clear all stored URLs.

## Project Structure

```
url-shortener-microservice/
│
├── public/                 # Public assets
│   ├── index.html          # Main HTML file
│   └── ...
│
├── views/                  # View templates
│   ├── index.html          # Main HTML file
│   └── ...
│
├── src/                    # Source files
│   ├── index.js            # Entry point
│   └── ...
│
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## API Endpoints

- **POST `/api/shorturl`**: Create a shortened URL.
  - Request Body: `{ url: "https://www.example.com" }`
  - Response: `{ "original_url": "https://www.example.com", "short_url": 1 }`

- **GET `/api/shorturl/:short_url`**: Redirect to the original URL.
  - Response: Redirects to the original URL.

- **GET `/api/allurls`**: Get a list of all shortened URLs.
  - Response: `[ { "original_url": "https://www.example.com", "short_url": 1 }, ... ]`

- **DELETE `/api/a-hacker-cleared-my-db`**: Clear all stored URLs.
  - Response: `{ message: 'All URLs have been cleared' }`

## Troubleshooting

If port 3000 is already in use, you can find the process ID (PID) and kill it using the following steps:

1. **Find the PID**:
    ```bash
    lsof -i :3000
    ```

    This command will list the processes using port 3000. Look for the PID in the output.

2. **Kill the process**:
    ```bash
    kill -9 <PID>
    ```

    Replace `<PID>` with the actual process ID you found in the previous step.

3. **Restart the server**:
    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Thank you for checking out my URL Shortener Microservice project! If you have any questions or feedback, feel free to reach out.
