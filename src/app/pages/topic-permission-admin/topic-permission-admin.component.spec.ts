import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPermissionAdminComponent } from './topic-permission-admin.component';

describe('TopicPermissionAdminComponent', () => {
  let component: TopicPermissionAdminComponent;
  let fixture: ComponentFixture<TopicPermissionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicPermissionAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicPermissionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
