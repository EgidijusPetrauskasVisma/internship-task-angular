import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/core/types';

@Pipe({
    name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform {
    transform(products: Product[], filterValue: 'all' | 'petrol' | 'diesel'): Product[] {
        if (filterValue === 'all') return products;
        return products.filter(p => p.fuel === filterValue);
    }
}