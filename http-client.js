export default class HttpClient{

    async  post(url, body = {}, headers = {}) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            body: JSON.stringify(body),
          });
          console.log("Post performed bro")
          return await this.handleResponse(response);
        } catch (error) {
          console.error('POST request failed:', error);
          throw error;
        }
      }


  async handleResponse(response) {
    if (!response.ok) {
      const errorMessage = await response.text();
    //   throw new Error(HTTP error! status: ${response.status}, message: ${errorMessage});
    }
    return response.json();
  }

}
