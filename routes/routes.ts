import { Router } from "https://deno.land/x/oak/mod.ts";
import { authorized } from "../middlewares/isAuthorized.ts";

import { 
  signup,
  signin,
} from "../controllers/users.ts"; // Import controller methods

import { 
  addInvoice,
  getInvoices,
  getInvoice
} from "../controllers/invoices.ts"; // Import controller methods

import { previewPdf, createPdf } from "../controllers/pdf.ts";

const router = new Router();

// user routes
router
  .post('/api/users/signup', signup) // Signup a user
  .post('/api/users/signin', signin);

// invoice routes  
router
  .post('/api/invoices', authorized, addInvoice)
  .get('/api/invoices', authorized, getInvoices)
  .get('/api/invoices/:invoiceNumber', authorized, getInvoice);

// pdf routes
router
  .post('/api/pdf/preview', /*authorized,*/ previewPdf)
  .post('/api/pdf/create', /*authorized,*/ createPdf);

export default router;