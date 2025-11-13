import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  title: string;
  content: string;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  articles: Article[];
}

@Injectable({ providedIn: 'root' })
export class TopicService {
  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('http://localhost:8080/api/topics');
  }
  getTopicsWithArticles(): Observable<Topic[]> {
    return this.http.get<Topic[]>(
      'http://localhost:8080/api/topics-with-articles'
    );
  }

  createTopic(topic: Partial<Topic>) {
    return this.http.post<Topic>('http://localhost:8080/api/topics', topic);
  }
  updateTopic(topic: Topic) {
    return this.http.put<Topic>(
      `http://localhost:8080/api/topics/${topic.id}`,
      topic
    );
  }
  deleteTopic(id: number) {
    return this.http.delete(`http://localhost:8080/api/topics/${id}`);
  }
}
