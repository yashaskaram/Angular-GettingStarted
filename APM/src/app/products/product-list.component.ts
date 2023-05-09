import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    sub!: Subscription;
    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.sub = this.productService.getProducts()
            .subscribe({next: products => {
                this.products = products;
                this.FilteredProducts = this.products;
            }
        });
    }
    
    pageTitle: string = 'Product List';
    showImage: boolean = false;
    imageWidth: number = 50;
    imageMargin: number = 2;
    products: IProduct[] = [];

    private _listFilter: string = '';

    get listFilter() {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.FilteredProducts = this.filterProducts(this.listFilter);
    }
    FilteredProducts: IProduct[] = [];

    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    filterProducts(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((p : IProduct) => 
            p.productName.toLocaleLowerCase().includes(filterBy));
    }

    OnRatingClicked(message: string) : void {
        this.pageTitle = 'Product List: ' + message;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}


