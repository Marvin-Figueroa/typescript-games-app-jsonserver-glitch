export default class HttpClient {
  static #instance;

  constructor() {
    if (HttpClient.#instance) {
      return HttpClient.#instance;
    }

    HttpClient.#instance = this;
  }

  async #fetchJSON(endpoint, options = {}) {
    const res = await fetch(endpoint, { ...options });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    if (options.parseResponse && res.status !== 204) {
      return res.json();
    }

    return res;
  }

  get(endpoint, options = {}) {
    return this.#fetchJSON(endpoint, {
      parseResponse: true,
      ...options,
      method: 'GET',
    });
  }

  post(endpoint, body, options = {}) {
    return this.#fetchJSON(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete(endpoint, options = {}) {
    return this.#fetchJSON(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }

  patch(endpoint, body, options = {}) {
    return this.#fetchJSON(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
