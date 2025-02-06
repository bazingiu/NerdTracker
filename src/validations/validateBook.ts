import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors"; // Optional: Custom error messages
import { BookData } from "../types/BookTypes";

// Initialize AJV instance
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv); // Optional

// Define the JSON Schema for BookData validation
const bookSchema: JSONSchemaType<BookData> = {
  type: "object",
  properties: {
    title: { 
      type: "string", 
      minLength: 1, 
      maxLength: 200, // Title should be reasonable
      errorMessage: "Title is required and must be a string (max 200 characters)."
    },
    author: { 
      type: "string", 
      minLength: 1, 
      maxLength: 100, // Limit author name length
      errorMessage: "Author is required and must be a string (max 100 characters)."
    },
    description: { 
      type: "string", 
      nullable: true, 
      maxLength: 500, 
      errorMessage: "Description should not exceed 500 characters."
    },
    rating: { 
      type: "number", 
      minimum: 0, 
      maximum: 10, 
      multipleOf: 0.1, 
      nullable: true, 
      errorMessage: "Rating must be between 0 and 10 (up to 1 decimal place)."
    },
  },
  required: ["title", "author"], // Required fields
  additionalProperties: false,
  errorMessage: "Invalid request body. Check the provided fields.",
};

// Compile the validation function using AJV
export const validateBook = ajv.compile(bookSchema);
