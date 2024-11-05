```mermaid
sequence diagram
    participant browser
    participant server

    browser-->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->browswer: JSON
    deactivate server

    Note right of browser: The browser adds new note to local variable and render it at the bottom of the page
```