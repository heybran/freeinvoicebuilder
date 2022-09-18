import { config } from "https://deno.land/x/dotenv/mod.ts";
import { InvoiceSchema, InvoiceItemSchema } from "../schema/invoice.ts";
const { DATA_API_KEY, APP_ID } = config();

const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
const DATA_SOURCE = "Cluster0";
const DATABASE = "invoice_db";
const COLLECTION = "invoices";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": DATA_API_KEY 
  },
  body: ""
};

export const addInvoice = async ({ request, response, }: { request: any; response: any; }) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const body = await request.body();
      const invoice = await body.value;
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: invoice
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      
      response.status = 201;
      response.body = {
        success: true,
        data: invoice,
        insertedId
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

export const getInvoices = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allInvoices = await dataResponse.json();

    if (allInvoices) {
      response.status = 200;
      response.body = {
        success: true,
        data: allInvoices,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

export const getInvoice = async ({
  params,
  response,
}: {
  params: { invoiceNumber: string };
  response: any;
}) => {
  const URI = `${BASE_URI}/findOne`;
  const query = {
    collection: COLLECTION,
    database: DATABASE,
    dataSource: DATA_SOURCE,
    filter: { invoiceNumber: params.invoiceNumber }
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  console.log(options);
  const invoice = await dataResponse.json();
  
  if (invoice.document) {
    response.status = 200;
    response.body = {
      success: true,
      data: invoice,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No todo found",
    };
  }
};

const updateTodo = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body();
    const { title, complete } = await body.value;
    const URI = `${BASE_URI}/updateOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { todoId: parseInt(params.id) },
      update: { $set: { title, complete } }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const todoUpdated = await dataResponse.json();
    
    response.status = 200;
    response.body = { 
      success: true,
      todoUpdated 
    };
    
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteTodo = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  try {
    const URI = `${BASE_URI}/deleteOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { todoId: parseInt(params.id) }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const todoDeleted = await dataResponse.json();

    response.status = 201;
    response.body = {
      todoDeleted
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const getIncompleteTodos = async ({ response }: { response: any }) => {
  const URI = `${BASE_URI}/aggregate`;
  const pipeline = [
    {
      $match: {
        complete: false
      }
    }, 
    {
      $count: 'incomplete'
    }
  ];
  const query = {
    dataSource: DATA_SOURCE,
    database: DATABASE,
    collection: COLLECTION,
    pipeline
  };

  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const incompleteCount = await dataResponse.json();
  
  if (incompleteCount) {
    response.status = 200;
    response.body = {
      success: true,
      incompleteCount,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No incomplete todos found",
    };
  }
};