const axios = require("axios");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const { query } = event.queryStringParameters;
    const response = await axios.get(`${process.env.YOUTUBE_BASE_PATH}?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title))&maxResults=1}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ response: response }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};