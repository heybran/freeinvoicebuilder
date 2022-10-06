import { config } from "https://deno.land/x/dotenv/mod.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { key } from "../utils/apiKey.ts";

interface User {
  email: string;
  fullname: string;
  password?: string;
}
const { SENDINBLUE_API_KEY } = config();

export const verifyEmail = async (user: User) => {
  const jwt = await create({ alg: 'HS512', typ: 'JWT' }, { email: user.email }, key);
  const res = await fetch('https://api.sendinblue.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': SENDINBLUE_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: 'Free Invoice Builder',
        email: 'noreply@freeinvoicebuilder.app'
      },
      to: [{ email: user.email, fullname: user.fullname }],
      subject: 'Free Invoice Builder - Please verify your email',
      htmlContent: `
        <html>
          <head></head>
          <body>
            <header>
              <h3>Hey ${user.fullname}, Please verify your email.</h3>
            </header>
            <p>By clicking on the following link, you are confirming your email address.</p>
            <a href="http://localhost:3000/signup/${jwt}">Confirm Email Address</a>
          </body>
        </html>
      `
    })
  });

  if (res.status == 201) {
    return true;
  } else {
    return false;
  }
}