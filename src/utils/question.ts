const { createInterface } = require("readline");

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (message: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        rl.question(message, (answer: string) => {
            resolve(answer);
        });
    });
};

export default question;