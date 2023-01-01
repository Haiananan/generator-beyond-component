const fs = require("fs");
const path = require("path");
var Schema = require("mongoose").Schema;
let unique = "";
module.exports = function codeService(dir) {
  let code = fs.readFileSync(dir, "utf-8");

  code = code.slice(code.indexOf("new Schema"));
  const schema = subBetween(code, "new Schema(", ")");
  const obj = JSON.parse(JSON.stringify(schema));
  let schemaObj;
  eval(`schemaObj = ${obj}`);

  const modelString = createModelString(schemaObj);
  const validationString = createVailidationString(schemaObj);
  const validationStringWithoutRequired = createVailidationString(
    schemaObj,
    false
  );

  return {
    modelString,
    validationString,
    unique,
    validationStringWithoutRequired,
  };
};
function createVailidationString(schema, withRequire = true) {
  let validationString = "";
  for (let key in schema) {
    let value = schema[key],
      base = "";

    if (Array.isArray(value.type)) {
      base = `  ${key}: Joi.array()`;
      if (value.required) base += ".required()";
    } else {
      base = `  ${key}: Joi.${getType(value).toLowerCase()}()`;
      if (value.required && withRequire) base += ".required()";
      if (value.min || value.minLength)
        base += `.min(${value.min || value.minLength})`;
      if (value.max || value.maxLength)
        base += `.max(${value.max || value.maxLength})`;
      if (value.match) base += `.regex(${value.match})`;
      if (value.enum)
        base += `.valid(${value.enum.map((e) => `'${e}'`).join(",")})`;
      if (value.default) base += `.default(${value.default})`;

      validationString += base + ",\n";
    }
  }
  return validationString;
}

function createModelString(schema) {
  let modelString = "";
  for (let key in schema) {
    let value = schema[key];
    if (value?.unique) {
      unique = key;
    }
    if (value.enum) {
      modelString += `  ${key}${getOptional(value)}: ${value.enum
        .map((e) => `'${e}'`)
        .join(" | ")}\n`;
    } else {
      modelString += `  ${key}${getOptional(value)}: ${getType(
        value
      )}${getArrayChar(value)}\n`;
    }
  }
  function getArrayChar(value) {
    if (Array.isArray(value) || Array.isArray(value?.type)) return "[]";
    else return "";
  }
  function getOptional(value) {
    return value.required ? "" : "?";
  }
  return modelString;
}

function getType(value) {
  // console.log(value.toString());
  // console.log(value?.type?.toString());
  if (
    value?.type === String ||
    value?.type?.toString().indexOf("function String") !== -1
  )
    return "string";
  else if (
    value?.type === Number ||
    value?.type?.toString().indexOf("function Number()") !== -1
  )
    return "number";
  else if (
    value === Boolean ||
    value?.type?.toString().indexOf("function Boolean") !== -1
  )
    return "boolean";
  else if (
    value?.type === Date ||
    value?.type?.toString().indexOf("function Date") !== -1
  )
    return "Date";
  else if (
    value?.type === Schema.Types.Mixed ||
    value?.type?.toString().indexOf("function Mixed") !== -1
  )
    return "any";
  else return "unknown";
}
// 工具函数，截取字符串
function subBetween(str, start, end) {
  if (typeof str !== "string") {
    return "";
  }
  if (typeof start !== "string" || typeof end !== "string") {
    return "";
  }
  const startIndex = str.indexOf(start);
  const endIndex = str.indexOf(end);
  if (startIndex === -1 || endIndex === -1) {
    return "";
  }
  return str.substring(startIndex + start.length, endIndex);
}
