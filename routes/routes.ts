import { Router } from "https://deno.land/x/oak/mod.ts";
import { authorized } from "../middlewares/isAuthorized.ts";

import { 
  addTodo, 
  getTodos, 
  getTodo,
  updateTodo,
  deleteTodo,
  getIncompleteTodos
} from "../controllers/todos.ts"; // Import controller methods

import { 
  signup,
  signin
} from "../controllers/users.ts"; // Import controller methods

import { 
  addInvoice,
  getInvoices,
  getInvoice
} from "../controllers/invoices.ts"; // Import controller methods

import { createPdf } from "../controllers/pdf.ts";

const router = new Router();

// Implement routes
router
  .post("/api/todos", addTodo) // Add a todo
  .get("/api/todos", getTodos) // Get all todos
  .get("/api/todos/:id", getTodo) // Get one todo
  .get("/api/todos/incomplete/count", getIncompleteTodos) // Get incomplete todo count
  .put("/api/todos/:id", updateTodo) // Update a todo
  .delete("/api/todos/:id", deleteTodo); // Delete a todo

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
  .post('/api/pdf/create', authorized, createPdf);

export default router;