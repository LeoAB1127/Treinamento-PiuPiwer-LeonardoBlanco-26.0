const API_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export interface Post {
  id: string;
  userName: string;
  userHandle: string;
  createdAt: string;
  content: string;
  likes: number;
  comments: number;
  mediaSrc?: string;
  author?: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getPosts(page: number = 1, limit: number = 20): Promise<Post[]> {
    return this.request(`/posts?page=${page}&limit=${limit}`);
  }

  async getPost(id: string): Promise<Post & { commentsList: Comment[] }> {
    return this.request(`/posts/${id}`);
  }

  async createPost(text: string, imageUrl?: string): Promise<Post> {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify({ text, imageUrl }),
    });
  }

  async updatePost(id: string, text: string, imageUrl?: string): Promise<Post> {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ text, imageUrl }),
    });
  }

  async deletePost(id: string): Promise<void> {
    await this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async likePost(id: string): Promise<{ likes: number }> {
    return this.request(`/posts/${id}/likes`, {
      method: 'POST',
    });
  }

  async unlikePost(id: string): Promise<{ likes: number }> {
    return this.request(`/posts/${id}/likes`, {
      method: 'DELETE',
    });
  }

  async getComments(postId: string): Promise<Comment[]> {
    return this.request(`/posts/${postId}/comments`);
  }

  async createComment(postId: string, text: string): Promise<Comment> {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async updateComment(postId: string, commentId: string, text: string): Promise<Comment> {
    return this.request(`/posts/${postId}/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }

  async deleteComment(postId: string, commentId: string): Promise<void> {
    await this.request(`/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL || 'http://localhost:3000');