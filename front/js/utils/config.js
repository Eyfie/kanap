

//* Get server URL
const loadConfig = async () => {
    let data = await fetch("../js/utils/config.json")
    return data.json();
}