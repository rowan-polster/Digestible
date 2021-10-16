export class Recipe {

    label : string;
    image : string;
    link : string;
    ingredients : string[];

    constructor({label, image, link, ingredients} : NamedParameters) {

        this.label = label;
        this.image = image;
        this.link = link;
        this.ingredients = ingredients

    }
    
}

interface NamedParameters {

    label : string;
    image : string;
    link : string;
    ingredients : string[];

}