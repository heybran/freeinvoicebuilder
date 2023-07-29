// @ts-check
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ProblemDetails from "./utils/problemDetails.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendFolder = 'static';

/**
 * @param {http.IncomingMessage} req - The request object
 * @param {http.ServerResponse} res - The response object
 */
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, frontendFolder, req.url);

  if (req.url === "/") {
    filePath = path.join(__dirname, frontendFolder, 'index.html');
  }

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404;
      return res.end(JSON.stringify(new ProblemDetails({
        type: 'about:blank',
        title: "File not found",
        status: 404,
        detail: `${req.url} file does not exist on server`,
        instance: req.url || '',
      })));
    }

    // Read the file and send it as the response
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        // The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. 
        // Received an instance of ProblemDetails
        return res.end(JSON.stringify(new ProblemDetails({
          type: 'about:blank',
          title: "Internal server error",
          status: 500,
          detail: `Internal server error while fetching ${req.url}`,
          instance: req.url || '',
        })));
      }

      // Set the appropriate content type based on the file extension
      const extname = path.extname(filePath);
      let contentType = 'text/plain';
      if (extname === '.html') {
        contentType = 'text/html';
      } else if (extname === '.css') {
        contentType = 'text/css';
      } else if (extname === '.js') {
        contentType = 'text/javascript';
      }

      // Set the content type header and send the data
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  });
});

const port = process.env.PORT || 3003;
server.listen(port, () => {
  console.log(`Node server running on port ${port}`);
});