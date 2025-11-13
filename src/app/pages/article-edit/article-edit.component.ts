import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './article-edit.component.html',
})
export class ArticleEditComponent implements OnInit {
  article: Article = { title: '', content: '' };
  isEdit = false;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.articleService
        .getArticle(+id)
        .subscribe((data) => (this.article = data));
    }
  }

  save() {
    if (this.isEdit) {
      this.articleService
        .updateArticle(this.article)
        .subscribe(() => this.router.navigate(['/articles']));
    } else {
      this.articleService
        .createArticle(this.article)
        .subscribe(() => this.router.navigate(['/articles']));
    }
  }

  cancel() {
    this.router.navigate(['/articles']);
  }
}
