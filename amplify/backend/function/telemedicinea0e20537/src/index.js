

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	SERVICE_URL
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');

exports.handler = async () => {
  const { Parameters } = await (new aws.SSM())
    .getParameters({
      Names: ["SECRET_TOKEN"].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
  const SERVICE_URL = process.env.SERVICE_URL;
  const SECRET_TOKEN = Parameters.pop().Value;
  const response = {
    statusCode: 200,
    body: `SERVICE_URL: ${SERVICE_URL}, SECRET_TOKEN: ${SECRET_TOKEN}`,
  };

  return response;
};
