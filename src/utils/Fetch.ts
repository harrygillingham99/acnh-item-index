const fetchAsync = <T>(url: string, init?: RequestInit): Promise<T> => {
  return new Promise((resolve) => {
    fetch(url, init ?? { method: "GET" })
      .then((response) => response.json())
      .then((jsonResponse) => {
        resolve(jsonResponse);
      })
      .catch((exception) => console.log("Fetch failed! " + exception));
  });
};

export default fetchAsync;
