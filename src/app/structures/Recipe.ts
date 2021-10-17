export class Recipe {

    label : string;
    image : string;
    link : string;
    ingredients : string[];
    triggerIngredients : string[];

    constructor({label, image, link, ingredients, triggerIngredients} : NamedParameters) {

        this.label = label;
        this.image = image;
        this.link = link;
        this.ingredients = ingredients
        this.triggerIngredients = triggerIngredients;

    }
    
}

interface NamedParameters {

    label : string;
    image : string;
    link : string;
    ingredients : string[];
    triggerIngredients : string[];

}