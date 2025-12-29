export interface Order{
    id: number;
    client: string;
    date: string;
    amount:number;
    status: 'RESERVE' | 'A_LIVRER' | 'LIVREE' | 'ECHEC';
}
