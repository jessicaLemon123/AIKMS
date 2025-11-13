import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPermissionsPageComponent } from './roles-permissions.page.component';

describe('RolesPermissionsPageComponent', () => {
  let component: RolesPermissionsPageComponent;
  let fixture: ComponentFixture<RolesPermissionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesPermissionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesPermissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
