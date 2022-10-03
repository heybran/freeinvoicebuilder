import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DATA_API_KEY, APP_ID, SENDINBLUE_API_KEY } = config();
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { key } from "../utils/apiKey.ts";
import { sendSimpleMail } from "https://deno.land/x/sendgrid@0.0.3/mod.ts?s=sendSimpleMail";

const BASE_URI = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
const DATA_SOURCE = "Cluster0";
const DATABASE = "users_db";
const COLLECTION = "users";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": DATA_API_KEY 
  },
  body: ""
};

const sendEmail = async ({ request, response, }: { request: any; response: any; }) => {
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
  
      console.log(user);
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
}

const signup = async ({ request, response, }: { request: any; response: any; }) => {
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
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: {
          ...user,
          password: hashedPassword
        }
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      
      response.status = 201;
      response.body = {
        success: true,
        user: user.username,
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

const signin = async ({ request, response}: { request: any; response: any; }) => {
  const URI = `${BASE_URI}/findOne`;
  const body = await request.body();
  const { email, password } = await body.value;
  const query = {
    collection: COLLECTION,
    database: DATABASE,
    dataSource: DATA_SOURCE,
    filter: { email: email }
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  console.log(options); 
  const user = await dataResponse.json();

  console.log('user response: ', user);
  console.log(Boolean(user));

  /**
   * if no user found, user will be { document: null }
   * check if (!user) will fail as { document: null } will be true
   * so need to change it to (!user.document)
   */
  if (!user.document) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No user found",
    }
    console.log('hi');
    return;
  }

  const confirmPassword = await bcrypt.compare(password, user.document.password);
  console.log(confirmPassword);
  if (!confirmPassword) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Incorrect password",
    }
    return;
  }

  // authenticate a user
  const payload = {
    id: user.document._id,
    email: email
  };

  const jwt = await create({ alg: 'HS512', type: 'JWT' }, { payload }, key);
  if (jwt) {
    response.status = 200;
    response.body = {
      userId: user.document._id,
      email: user.document.email,
      token: jwt
    }
  } else {
    response.status = 500;
    response.body = {
      success: false,
      msg: "Internal server error",
    }
  }
};

const getTodos = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allTodos = await dataResponse.json();

    if (allTodos) {
      response.status = 200;
      response.body = {
        success: true,
        data: allTodos,
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

const getTodo = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const URI = `${BASE_URI}/findOne`;
  const query = {
    collection: COLLECTION,
    database: DATABASE,
    dataSource: DATA_SOURCE,
    filter: { todoId: parseInt(params.id) }
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const todo = await dataResponse.json();
  
  if (todo) {
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
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

export { sendEmail, signup, signin, getTodo, updateTodo, deleteTodo, getIncompleteTodos };