import { toBase64String } from "@angular/compiler/src/output/source_map";

export class Ingredient {

    name: string;
    category: string;
    originalShelfLife: number;

    constructor(name: string, category: string) {
        this.name = name;
        this.category = category;
        switch (category.toLowerCase()) {
            case "produce":
                this.originalShelfLife = 5
                break;
            
            case "dairy":
                this.originalShelfLife = 7;
                break;

            case "meat":
                this.originalShelfLife = 4;
                break;

            case "other":
                this.originalShelfLife = 10;
                break;
            
            default:
                this.originalShelfLife = 8;
        }
    }
    
}
