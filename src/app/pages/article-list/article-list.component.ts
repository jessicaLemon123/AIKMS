import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../../services/article.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true,
  templateUrl: './article-list.component.html',
  imports: [CommonModule, DatePipe],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit() {
    this.articleService
      .getArticles()
      .subscribe((list) => (this.articles = list));
  }

  edit(article: Article) {
    this.router.navigate(['/articles/edit', article.id]);
  }

  addNew() {
    this.router.navigate(['/articles/edit']);
  }

  delete(article: Article) {
    if (confirm('確定刪除這篇文章嗎？')) {
      this.articleService.deleteArticle(article.id!).subscribe(() => {
        this.articles = this.articles.filter((a) => a.id !== article.id);
      });
    }
  }
}
