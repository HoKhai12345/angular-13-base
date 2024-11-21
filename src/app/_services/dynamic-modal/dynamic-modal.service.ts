import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector} from '@angular/core';
import {DynamicModalComponent} from "../../components/dynamic-modal/dynamic-modal.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicModalService {
  private modalRef!: ComponentRef<DynamicModalComponent>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  openModal(childComponent: any, title: string, data: any = {}) {
    // Tạo modal
    const factory = this.resolver.resolveComponentFactory(DynamicModalComponent);
    this.modalRef = factory.create(this.injector);

    // Inject dữ liệu
    this.modalRef.instance.title = title;
    this.modalRef.instance.childComponent = childComponent;
    this.modalRef.instance.childInjector = Injector.create({
      providers: [{ provide: 'data', useValue: data }],
      parent: this.injector,
    });

    // Thêm modal vào DOM
    this.appRef.attachView(this.modalRef.hostView);
    const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Xử lý sự kiện close
    this.modalRef.instance.close.subscribe(() => this.closeModal());
    this.modalRef.instance.saveChanges.subscribe(() => {
      console.log('Save changes clicked');
      this.closeModal();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
    }
  }
}
