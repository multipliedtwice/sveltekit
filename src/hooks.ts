import type { Handle } from "@sveltejs/kit"
import { minify } from "html-minifier"

const minification_options = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  decodeEntities: true,
  html5: true,
  ignoreCustomComments: [/^#/],
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeOptionalTags: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
}

export const handle: Handle = async (ctx) => {
  const { event, resolve } = ctx
  const response = await resolve(event)

  const headers = new Headers({
    'content-type': 'text/html',
    'X-Content-Type-Options': `nosniff`,
    'Cache-Control': 'max-age=180, stale-while-revalidate=259200',
    ...response.headers,
  })
  console.log('headers :>> ', headers);
  return new Response(minify(await response.text(), minification_options), {
    status: response.status,
    headers
  });
}

export async function getSession(ctx) {
  const cookies = ctx.request.headers.get("cookie")

  return {
    cookies,
  }
}
