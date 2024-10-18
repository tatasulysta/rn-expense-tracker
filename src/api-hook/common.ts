export async function customFetch({ uri }: { uri: string }) {
  return await fetch(uri, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  });
}
