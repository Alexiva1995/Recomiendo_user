import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RolPage } from './rol.page';

describe('RolPage', () => {
  let component: RolPage;
  let fixture: ComponentFixture<RolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
