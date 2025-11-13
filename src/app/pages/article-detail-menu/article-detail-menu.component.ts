import { Component, OnInit } from '@angular/core';
import { TopicService, Topic } from '../../services/topic.service'; // 路徑依你的專案
import { ArticleService, Article } from '../../services/article.service';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'article-detail-menu',
  templateUrl: './article-detail-menu.component.html',
  standalone: true,
  imports: [CommonModule, MarkdownModule], // 你有用到哪些就加哪些
})
export class ArticleDetailMenuComponent implements OnInit {
  topics: (Topic & { open?: boolean })[] = [];
  selectedArticle: Article | null = null;

  constructor(
    private topicService: TopicService,
    private articleService: ArticleService
  ) {}

  toggleTopic(topic: Topic) {
    this.topics.forEach((t) => {
      t.open = t === topic ? !t.open : false;
    });
  }
  ngOnInit() {
    this.topicService.getTopics().subscribe((topics) => {
      this.topics = topics;
      // 預設顯示第一篇文章
      const firstArticle = topics[0]?.articles?.[0];
      if (firstArticle) this.selectArticle(firstArticle.id);
    });
  }

  selectArticle(articleId: number) {
    this.articleService.getArticle(articleId).subscribe((article) => {
      this.selectedArticle = article;
    });
  }
}
