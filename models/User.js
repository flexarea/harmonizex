
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  static get tableName() {
    return "User";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["spotify_id"],

      properties: {
        id: { type: "integer" },
        spotify_id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        profile_pic: { type: "string" },
      },
    };
  }

  // Override this method to exclude googleId
  $formatJson(json) {
    const formattedJson = super.$formatJson(json);
    delete formattedJson.spotify_id;
    return formattedJson;
  }
}

