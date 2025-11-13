import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService, Topic } from '../../services/topic.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topic-admin.component.html',
})
export class TopicAdminComponent implements OnInit {
  topics: Topic[] = [];
  editing: Partial<Topic> | null = null; // 用 Partial 防止 TS 報錯
  newTopic: Partial<Topic> = {}; // 同上

  constructor(private topicService: TopicService) {}

  ngOnInit() {
    this.loadTopics();
  }

  loadTopics() {
    this.topicService.getTopics().subscribe((topics) => (this.topics = topics));
  }

  addTopic() {
    if (!this.newTopic.name) return; // name 必填
    this.topicService.createTopic(this.newTopic).subscribe(() => {
      this.newTopic = {};
      this.loadTopics();
    });
  }

  editTopic(topic: Topic) {
    this.editing = { ...topic };
  }

  saveEdit() {
    if (!this.editing || !this.editing.id) return;
    this.topicService.updateTopic(this.editing as Topic).subscribe(() => {
      this.editing = null;
      this.loadTopics();
    });
  }

  cancelEdit() {
    this.editing = null;
  }

  deleteTopic(id: number | undefined) {
    if (!id) return;
    if (confirm('確定要刪除這個主題嗎？')) {
      this.topicService.deleteTopic(id).subscribe(() => this.loadTopics());
    }
  }
}
