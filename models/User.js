
import BaseModel from "./BaseModel";

export default class User extends BaseModel {
  static get tableName() {
    return "User";
  }
  static get idColumn() {
    return 'user_id';  // Tell Objection to use user_id as primary key
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["spotify_id"],

      properties: {
        user_id: { type: "integer" },
        spotify_id: { type: "string" },
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

