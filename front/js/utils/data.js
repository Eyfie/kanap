//* Fetch Data from the DB
const fetchData = async (config,url) => {
    try{
        const response = await fetch(config.host+url);
    
        if(!response.ok) throw response;

        return response.json()
    }
    catch(e){
        throw Error(e.status ? `${e.status} ${e.statusText}` : 'Le serveur ne répond pas');
    }
}


//* Post data for order
const postData = async (config,url,order) => {
    try{

        const response = await fetch(config.host + url,{
            method : 'POST',
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : order
        });
        
        
        if(!response.ok) throw response;

        return response.json();
    }
    catch(e){
        throw Error(e.status ? `${e.status} ${e.statusText}` : 'Le serveur ne répond pas');
    }
}