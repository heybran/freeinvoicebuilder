// https://github.com/lucacasonato/deno-puppeteer
import puppeteer, { PaperFormat } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

export async function createPDF(
  url: string, 
  path = 'newfile.pdf',
  format: PaperFormat = 'A4',
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });
  // https://pptr.dev/api/puppeteer.pdfoptions
  await page.pdf({ format, path });
  await browser.close();
}