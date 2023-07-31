import puppeteer from "puppeteer";
import path from 'path';
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import ProblemDetails from "../utils/problemDetails.js";
import { invoiceLayoutWithoutHeader, invoiceLayoutWithHeader} from "../templates/invoiceLayout.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {import('http').IncomingMessage} req - The request object
 * @param {import('http').ServerResponse} res - The response object
 * @param {string} body
 */
export const previewPDF = async (req, res, body) => {
  try {
    const invoiceHTMLString = invoiceLayoutWithoutHeader(JSON.parse(body));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    return res.end(invoiceHTMLString);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application');
    return res.end(JSON.stringify(new ProblemDetails({
      type: 'about:blank',
      title: "Internal server error",
      status: 500,
      detail: `Internal server error while previewing invoice: ${req.url}`,
      instance: req.url || '',
    })));
  }
}

/**
 * @param {import('http').IncomingMessage} req - The request object
 * @param {import('http').ServerResponse} res - The response object
 * @param {string} body
 */
export const createPDF = async (req, res, body) => {
  try {
    const template = invoiceLayoutWithHeader(JSON.parse(body));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template);
    await page.emulateMediaType('screen');
    const uuid = randomUUID();
    await page.pdf({
      path: path.join(__dirname, `../assets/invoices/${uuid}.pdf`),
      format: 'A4',
      scale: 0.9,
      printBackground: true
    });

    console.log('done');
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application');
    // JSON.stringify is important here
    // it will throw error if not present even though pdf will be created
    res.end(JSON.stringify({
      invoicePath: `/assets/invoices/${uuid}.pdf`
    }));
    await browser.close();
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application');
    return res.end(JSON.stringify(new ProblemDetails({
      type: 'about:blank',
      title: "Internal server error",
      status: 500,
      detail: `Internal server error while creating invoice: ${req.url}`,
      instance: req.url || '',
    })));
  }
}
