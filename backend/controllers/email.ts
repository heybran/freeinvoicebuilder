import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { key } from "../utils/apiKey.ts";

const { SENDINBLUE_API_KEY } = config();

export const verifyEmail = async ({ request, response }: { request: any; response: any; }) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const body = await request.body();
      const user = await body.value;
      const jwt = await create({ alg: 'HS512', typ: 'JWT' }, { email: user.email }, key);
      fetch('https://api.sendinblue.com/v3/smtp/email', {
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
          to: [
            {
              email: user.email,
              name: user.fullname
            }
          ],
          subject: '[Free Invoice Builder] Please verify your email',
          htmlContent: `
            <html>
              <head></head>
              <body>
                <header>TODO:</header>
                <h1>
                  Hey ${user.fullname}, you're on your way!
                  Let's confirm your email address.
                </h1>
                <p>By clicking on the following link, you are confirming your email address.</p>
                <a href="http://localhost:3000/signup/${jwt}">Confirm Email Address</a>
              </body>
            </html>
          `
        })
      })
      .then(() => console.log('Verification email sent successfully!'))
      .catch(err => console.log(err));

      console.log(user);
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
}