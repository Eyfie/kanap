
/*
* Function to load the URL of the site and re-use it later
*/


async function loadConfig(){
    let result = await fetch("../js/utils/config.json");
    return result.json();
}