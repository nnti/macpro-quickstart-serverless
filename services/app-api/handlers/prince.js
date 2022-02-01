import handler from "./../libs/handler-lib";
import { execSync } from "child_process";
import * as fs from "fs";

export const prince = async (event, context) => {
  if (!event || !event.body) {
    return new Error("No data.");
  }

  // If this invocation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const body = event.body;
  const b64EncodedString = Buffer.from(body, "base64");

  //verify input is base64 encoded
  if (b64EncodedString.toString("base64") !== body) {
    return new Error("Content is not base64 encoded.");
  }

  let html = b64EncodedString.toString("ascii");
  fs.writeFileSync("/tmp/input", html);
  try {
    let result = execSync(`/opt/prince /tmp/input -o - --pdf-profile=PDF/UA-1`);
    return result.toString("base64");
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

export const main = handler(prince);
