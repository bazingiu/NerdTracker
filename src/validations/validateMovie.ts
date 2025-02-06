import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors"; // Optional: Improve error messages
import { MovieData } from "../types/MovieTypes";

// Initialize AJV with error collection and custom messages support
const ajv = new Ajv({ allErrors: true });

// Add support for date and other formats
addFormats(ajv);
addErrors(ajv); // Optional: Helps provide better validation messages

// Define the JSON Schema for movie validation
const movieSchema: JSONSchemaType<MovieData> = {
  type: "object",
  properties: {
    title: { 
      type: "string", 
      minLength: 1, 
      errorMessage: "Title is required and must be a non-empty string." 
    },
    description: { 
      type: "string", 
      nullable: true, 
      maxLength: 500, // Limit description length 
      errorMessage: "Description should be a string with max 500 characters."
    },
    releaseDate: { 
      type: "string", 
      format: "date",  // Use "date" instead of "date-time" unless time is needed
      errorMessage: "Release date must be in YYYY-MM-DD format." 
    },
    rating: { 
      type: "number", 
      minimum: 0, 
      maximum: 10, 
      multipleOf: 0.1, // Ensures a rating like 7.5 is valid, but 7.53 is not
      nullable: true, 
      errorMessage: "Rating must be a number between 0 and 10, with max 1 decimal place."
    },
  },
  required: ["title", "releaseDate"], // Ensure title & releaseDate are mandatory
  additionalProperties: false,
  errorMessage: {
    additionalProperties: "Unexpected property found in request body.",
  },
};

// Compile the validation function using AJV
export const validateMovie = ajv.compile(movieSchema);
