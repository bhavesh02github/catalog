const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let secret = 0;
    for (let i = 0; i < k; i++) {
        let li = 1;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                li *= points[j].x / (points[j].x - points[i].x);
            }
        }
        secret += points[i].y * li;
    }
    return Math.round(secret);
}

function findSecret(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const n = data.keys.n;
    const k = data.keys.k;

    let points = [];

    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            let x = parseInt(i);  
            let base = parseInt(data[i].base); 
            let y = decodeValue(data[i].value, base);  
            points.push({ x, y });
        }
    }

    return lagrangeInterpolation(points, k);
}

function main() {
    const secret1 = findSecret('testcase1.json');
    console.log("Secret for first test case constant c:", secret1);

    const secret2 = findSecret('testcase2.json');
    console.log("Secret for second test case constant c:", secret2);

    const secret3 = findSecret('testcase3.json');
    console.log("Secret for third test case constant c:", secret3);
}

main();
