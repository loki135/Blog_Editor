export interface Blog {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface BlogFormData {
  _id?: string;
  title: string;
  content: string;
  tags: string;
}