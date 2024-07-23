

function generateRandomName() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `user${result}`;
}

export const getRegistrationData = () =>  {
    const name =  generateRandomName();
    let today_time = new Date().toISOString().slice(0, 16).replace(':', '-');
    let email = `aqa-kateryna${today_time}_${Math.random() * Math.pow(9, 4) | 0}@gmail.com`;

    return {
        name: name,
        last_name: 'Test',
        email: email,
        password: '145711Kateryna',
    }
}