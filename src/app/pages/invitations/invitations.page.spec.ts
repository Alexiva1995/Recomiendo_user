import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitationsPage } from './invitations.page';

describe('InvitationsPage', () => {
  let component: InvitationsPage;
  let fixture: ComponentFixture<InvitationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
