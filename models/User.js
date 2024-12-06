
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  static get tableName() {
    return "User";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["spotifyId"],

      properties: {
        id: { type: "integer" },
        spotifyId: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        profie_pic: { type: "string" },
      },
    };
  }

  // Override this method to exclude googleId
  $formatJson(json) {
    const formattedJson = super.$formatJson(json);
    delete formattedJson.spotifyId;
    return formattedJson;
  }
}

