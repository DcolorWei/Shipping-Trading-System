interface Matter {
    orderId: number | null;
    clientCompanyName: string | null;
    startDate: string | null;
    landTransCompanyName: string | null;
    seaTransCompanyName: string | null;
    status: string | null
}

interface Address {
    country: string | null;
    city: string | null;
    address: string | null;
}

interface Cargo {
    cargoName: string;
    cargoModel: string;
    cargoSize: string;
    cargoNum: number;
    category: string;
    cargoWeight: number;
}

interface Matters {
    phone: string | null;
    email: string | null;
    fax: string | null;
    unStackable: boolean | null;
    perishable: boolean | null;
    dangerous: boolean | null;
    clearance: boolean | null;
    incoterms: string | null;
    other: string | null;
    sendAddress: Address;
    receiveAddress: Address;
    deliveryDate: string | null;
    hopeReachDate: string | null;
    cargos: Cargo[]

}

export {
    Matter,
    Matters
}