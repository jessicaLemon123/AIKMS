import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicAdminComponent } from './topic-admin.component';

describe('TopicAdminComponent', () => {
  let component: TopicAdminComponent;
  let fixture: ComponentFixture<TopicAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
