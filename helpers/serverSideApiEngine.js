const redirectOnError = (ctx) =>
  typeof window !== 'undefined'
    ? Router.push('/')
    : ctx.res.writeHead(302, {Location: '/'}).end()

export default async (apiUrl, token, ctx) => {
  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({token})
      }
    })

    if (response.ok) {
      const js = await response.json()
      console.log('js', js)
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError(ctx)
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError(ctx)
  }

}