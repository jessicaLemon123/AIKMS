import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id?: number;
  topic?: {
    id: number;
    name: string;
  };
  title: string;
  content: string;
  authorId?: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/articles';

  constructor(private http: HttpClient) {}

  // 查詢所有
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}`);
  }

  // 查詢單篇
  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  // 新增
  createArticle(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/create`, article);
  }

  // 編輯
  updateArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(
      `${this.apiUrl}/update/${article.id}`,
      article
    );
  }

  // 刪除
  deleteArticle(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/delete/${id}`, {});
  }
}
