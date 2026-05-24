export interface Product {
  id: string;
  nameID: string; // internal ID
  nameFR: string;
  nameEN: string;
  descriptionFR: string;
  descriptionEN: string;
  image: string;
  category: 'aluminium' | 'antiadhesif' | 'inox' | 'pro';
  sizes: string[];
  featuresFR: string[];
  featuresEN: string[];
}

export interface Recipe {
  id: string;
  nameFR: string;
  nameEN: string;
  descriptionFR: string;
  descriptionEN: string;
  image: string;
  prepTimeFR: string;
  prepTimeEN: string;
  cookTimeFR: string;
  cookTimeEN: string;
  servingsFR: string;
  servingsEN: string;
  ingredientsFR: string[];
  ingredientsEN: string[];
  stepsFR: string[];
  stepsEN: string[];
}

export type Language = 'fr' | 'en';
