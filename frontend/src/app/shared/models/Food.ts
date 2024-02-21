export class Food {
    id!: string;
    name!: string;
    price!: number;
    tags?: string[];   // optional is lia ?
    favorite!: boolean;    // ! means required
    stars!: number;
    imageUrl!: string;
    origins!: string[];
    cookTime!: string;
}