exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    const { query } = event.queryStringParameters;
    const response = await fetch(`${process.env.YOUTUBE_BASE_PATH}?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title))&maxResults=1}`);

    console.log(query);
    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(await response.json()),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};