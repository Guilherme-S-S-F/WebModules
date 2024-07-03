import { MercadoPagoConfig, Preference }  from "mercadopago";

interface ICheckoutPreference {
    preferenceId: string;
    preferenceUrl: string;
}

class Checkout {
    client: MercadoPagoConfig;
    constructor() {
        this.client = new MercadoPagoConfig({ accessToken: 'ACCESS-TOKEN' });
    }

    async getPreference(data : any) : Promise<ICheckoutPreference | null> {
        const preference = new Preference(this.client);

        const preferenceID = await preference.create({
            "body": {
              "items": data.products
            }
        })
        console.log(preferenceID);

        if (!preferenceID.id || !preferenceID.init_point) return null;

        return {preferenceId: preferenceID.id, preferenceUrl: preferenceID.init_point};
    }
}

export default new Checkout();