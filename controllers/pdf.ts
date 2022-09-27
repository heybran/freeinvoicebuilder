// https://github.com/lucacasonato/deno-puppeteer
import { create } from "https://deno.land/x/djwt@v2.7/mod.ts";
import puppeteer, { PaperFormat } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

export const createPdf = async (/*{ request, response}: { request: any, response: any }*/) => {
  // const body = await request.body();
  // const invoiceData = await body.value;
  const templte = await Deno.readTextFile('./templates/template1.html');
  console.log(templte);
}

createPdf();