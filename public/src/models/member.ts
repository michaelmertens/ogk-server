export interface Member {
    id: string;
    firstName: string;
    lastName: string;
    address?: string;
    iban?: string;
    ssn?: string;
}

export interface MemberFavorites {
    beer: string;
    cocktail: string;
    hungoverfood: string;
    pizza: string;
    burger: string;
    kebab: string;
    koffie: string;
}
