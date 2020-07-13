import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalResult} from './modal-result';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-form-modyfication-modal',
  templateUrl: './product-form-modal.component.html'
})
export class ProductFormModalComponent implements OnInit {
  @Input()
  modalResult$: Observable<ModalResult>;
  modalResult: ModalResult;
  @ViewChild('templateRef')
  private modalRef: TemplateRef<any>;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.modalResult$.subscribe(value => {
      this.modalResult = value;
      this.modalService.open(this.modalRef);
    });
  }

  closeModal(closeClick: string): void {
    this.modalService.dismissAll(closeClick);
  }
}
