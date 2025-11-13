import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailMenuComponent } from './article-detail-menu.component';

describe('ArticleDetailMenuComponent', () => {
  let component: ArticleDetailMenuComponent;
  let fixture: ComponentFixture<ArticleDetailMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDetailMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleDetailMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
