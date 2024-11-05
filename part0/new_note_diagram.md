```mermaid
sequence diagram
    participant browser
    participant server

    browser-->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->browswer: HTML Document
    deactivate server

    browser-->server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->browswer: HTML Document
    deactivate server

    browser-->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->browswer: CSS file
    deactivate server

    browser-->server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->browswer: Javascript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser-->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->browswer: JSON file
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```