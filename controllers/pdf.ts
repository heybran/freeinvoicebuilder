// https://github.com/lucacasonato/deno-puppeteer
import { create } from "https://deno.land/x/djwt@v2.7/mod.ts";
import puppeteer, { PaperFormat } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import invoiceLayout from "../templates/invoiceLayout.ts";

const prepareTemplate = async (invoiceData) => {
  let template = await Deno.readTextFile(Deno.cwd() + '/templates/' + 'template1.html');
  for (const [key, value] of Object.entries(invoiceData)) {
    const regex = new RegExp(key, 'ig');
    template = template.replace(regex, value);
  }

  return template;
}

export const previewPdf = async ({ request, response}: { request: any, response: any }) => {
  try {
    const body = await request.body();
    const invoiceData = await body.value;
    const template = await prepareTemplate(invoiceData);
    response.status = 200;
    response.body = {
      success: true,
      data: template
    }
  } catch (error) {
    response.body = {
      success: false,
      message: error.toString()
    }
  }
}

export const createPdf = async ({ request, response}: { request: any, response: any }) => {
  try {
    const body = await request.body();
    const invoiceData = await body.value;
    const template = await prepareTemplate(invoiceData);

    console.log(template);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: 'mypdf.pdf',
      format: 'A4',
      printBackground: true
    });

    console.log('done');
    await browser.close();
    response.body = {
      success: true,
      message: 'PDF created!'
    }
  } catch (error) {
    response.body = {
      success: false,
      message: error.toString()
    }
  }
}