exports.handler = async (event) => {
  const { provider } = event.queryStringParameters || {};

  if (provider !== 'github') {
    return { statusCode: 400, body: 'Provider not supported' };
  }

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: `${process.env.URL}/.netlify/functions/callback`,
    scope: 'repo,user',
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Cache-Control': 'no-cache',
    },
  };
};
