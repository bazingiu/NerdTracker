import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors"; // Optional: Custom error messages
import { TVShowData } from "../types/TVShowTypes";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv); // Optional

// Define the JSON Schema for TVShowData validation
const tvShowSchema: JSONSchemaType<TVShowData> = {
  type: "object",
  properties: {
    title: { 
      type: "string", 
      minLength: 1, 
      maxLength: 200,
      errorMessage: "Title is required and must be a string (max 200 characters)."
    },
    seasons: { 
      type: "integer", 
      minimum: 1, // Must be at least 1 season
      errorMessage: "Seasons must be an integer greater than or equal to 1."
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
  required: ["title", "seasons"], // Required fields
  additionalProperties: false,
  errorMessage: "Invalid request body. Check the provided fields.",
};

// Compile the validation function using AJV
export const validateTVShow = ajv.compile(tvShowSchema);

  