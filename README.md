# MDX on demand POC

This is a POC to measure the LOE for having dynamic MDX rendered on demand in a React app.

## How it works
- mdx-content-client is a React app, that performs a REST request to mdx-content-server to get the MDX contents.
- mdx-content-server scans mdx-docs folder and returns a list of MDX content according to the existing files on this dir. The returned data will be like this:
    ```json
    [
        {
            "title": "First Content",
            "content": "# Hello, world!"
        }
    ]
    ```
    `title` will be generated according to each file name, and `content` will have the markdown text found inside the file.
- mdx-content-client uses the `title` attribute to create an awful left menu. When user clicks on some item of this menu, the front-end will render the corresponding content using [mdxjs](https://mdxjs.com/guides/mdx-on-demand/).


## How to run
### 1 - start the back-end
```bash
cd mdx-content-server
npm i
node server.js
```

Perform a REST GET Request on `http://localhost:3001/content` to check if the API is working properly.

### 2 - start the front-end
```bash
cd mdx-content-client
npm i
npm start
```

### 3 - Open http://localhost:3000/ on browser.