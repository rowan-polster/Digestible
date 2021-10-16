export class Ingredient {

    name: string;
    category: string;
    originalShelfLife: number;

    constructor(name: string, category: string) {
        this.name = name;
        this.category = category;
        this.originalShelfLife = 5;
    }
    
}
