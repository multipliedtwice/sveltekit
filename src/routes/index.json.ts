export const get = async (ctx) => {
  console.log('Hit get endpoint');
  return {
    body: {
      ok: true,
    },
  }
}