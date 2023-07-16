const VITE_API_URL = import.meta.env.VITE_API_URL;

export class TagService {
  static async getTags() {
    try {
      const response = await fetch(`${VITE_API_URL}/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        }
      });
      return await response
        .json()
        .then((res) => res)
        .catch((err) => err);
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  }

  static async createTag(comment: string | undefined) {
    try {
      const response = await fetch(`${VITE_API_URL}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('bearer-token')}`
        },
        body: JSON.stringify({
          comment: comment
        })
      });
      return await response.json();
    } catch (error: any) {
      console.error(error);
      return error.response;
    }
  }
}
