export interface IKingsCupRulebook {
    key: string;
    name: string;
    author: string;
    description: string;
    readOnly: boolean;

    rule1: string;
    rule2: string;
    rule3: string;
    rule4: string;
    rule5: string;
    rule6: string;
    rule7: string;
    rule8: string;
    rule9: string;
    rule10: string;
    rule11: string;
    rule12: string;
    rule13: string;
}

export interface IKingsCupResponse {
  _embedded: {
    rulebooks: IKingsCupRulebook[]
  }
}