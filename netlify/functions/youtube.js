const YOUTUBE_SEARCH_ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const { query } = event.queryStringParameters;
    const response = await fetch(`${YOUTUBE_SEARCH_ENDPOINT}?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title))&maxResults=1}`);

    console.log(query);
    console.log(response);
    
    const { statusCode, statusText, ok, headers } = response;
    const body = JSON.stringify(await response.json());
    return {
      statusCode,
      statusText,
      ok,
      headers,
      body,
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};