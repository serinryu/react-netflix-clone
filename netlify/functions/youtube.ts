import fetch from "node-fetch";
import { HandlerEvent } from "@netlify/functions";

const YOUTUBE_SEARCH_ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

export const myhandler = async function (event:HandlerEvent) {
  console.log(event);

  const { query } : any = event.queryStringParameters;
  const response = await fetch(`${YOUTUBE_SEARCH_ENDPOINT}?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&fields=items(id,snippet(channelId,title))&maxResults=1}`);

  console.log(query);
  console.log(response);

  const { statusText, ok, headers } = response;
  const body = JSON.stringify(await response.json());
  return {
    statusCode: 200,
    statusText,
    ok,
    headers,
    body,
  };
};
