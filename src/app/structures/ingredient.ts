export class Ingredient {
    category: string;
    name: string;
    isExpiringSoon: boolean;
    constructor(category: string, name: string, isExpiringSoon: boolean) {
        this.category = category;
        this.name = name;
        this.isExpiringSoon = isExpiringSoon;
    }
}