import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService, Topic } from '../../services/topic.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topics-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topics-list.component.html',
})
export class TopicsListComponent implements OnInit {
  topics: Topic[] = [];
  loading = true;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.topicService.getTopicsWithArticles().subscribe({
      next: (data) => {
        this.topics = data;
        this.loading = false;
        console.log('topics', this.topics);
      },
      error: (err) => {
        this.loading = false;
        console.error('API 錯誤：', err);
      },
    });
  }
}
