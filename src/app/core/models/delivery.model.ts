

export interface Delivery{

    id: number;
    orderId: number;//identifianat de la commande liees a la livraison
    courier: string;//nom du livreur
    date: string;//date de la livraison
    status: 'EN_COURS' | 'LIVREE' |'ECHEC'
}