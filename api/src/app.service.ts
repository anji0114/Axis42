import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vulcan API</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-family: Arial, sans-serif;
              background-color: #FAF9F5;
            }
            h1 {
              color: #D97757;
              font-size: 18px;
              text-align: center;
              margin-bottom: 10px;
            }
            p {
              color:rgb(84, 47, 35);
              font-size: 14px;
              text-align: center;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to Vulcan API</h1>
          <p>This is the API for the Vulcan project.</p>
        </body>
      </html>
    `;
  }
}
