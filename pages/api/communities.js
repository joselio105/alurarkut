import { SiteClient } from "datocms-client";

export default async function requestsReceiver(request, response){

    const token = "03ea80e800a146389d2eafc7095f0a";
    const client = new SiteClient(token);

    if(request.method === 'POST'){
        console.log(request.body)
        try {
            const register = await client.items.create({
                itemType: "974147",
                ...request.body
                // title: "Eu amo gatos ❣",
                // imageUrl: "https://img10.orkut.br.com/community/381c8457db724d79bd46a02e5711f3a5.jpg",
                // creatorSlug: "joselio105"
            })
            
            response.json({
                record: register
            })
        } catch (error) {
            console.error(error)
        }
        
    }
}