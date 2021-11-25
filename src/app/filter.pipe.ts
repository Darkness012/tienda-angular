import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class Filter implements PipeTransform {
    transform(items: any, searchValue?: string): any {
        

        if(searchValue){

            let results: Array<any> = [];

            items.forEach((item:any) => {
                let add: boolean = true;
                searchValue.split("").forEach(letter => {
                    if(!item.nombre.includes(letter)){
                        add=false;
                    }
                });
    
                if(add) results.push(item)
            });
    
            return results;
        }

        return items;
        
    }
}