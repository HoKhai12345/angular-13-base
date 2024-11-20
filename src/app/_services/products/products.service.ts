import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, filter, map, Observable, skip} from "rxjs";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  color: string;
  complete: boolean
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productSubject = new BehaviorSubject<IProduct[]>([]);
  private filterSubject = new BehaviorSubject<string>('all');

  product$ = this.productSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  constructor() {
  }

  get filteredProducts$(): Observable<IProduct[]> {
    return combineLatest([this.product$, this.filter$]).pipe(
      skip(1),
      map(([product, filter]) => {
        if (filter === 'completed') {
          return product.filter((pr: any) => pr.complete)
        } else if (filter === 'incomplete') {
          return product.filter((pr: any) => !pr.complete)
        }
        return product
      })
    )
  }

  changeComplete(id: number): void {
    const updatedPro = this.productSubject.value.map((pro: IProduct) =>
      pro.id === id ? { ...pro, complete: !pro.complete } : pro
    );
    this.productSubject.next(updatedPro);
  }

  formatDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd:  any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    return formattedToday;

  }

  setFilter(filter: string): void {
    console.log("filter", filter);
    this.filterSubject.next(filter);
  }

  deleteItem(id: number): void {
    const currentProduct = this.productSubject.value;
    const products = currentProduct.filter((pr: any) => pr.id !== id);
    this.productSubject.next(products);
  }

  addProduct(product: IProduct): void {
    const currentProduct = this.productSubject.value;
    // @ts-ignore
    this.productSubject.next([...currentProduct, product]);
  }

}
