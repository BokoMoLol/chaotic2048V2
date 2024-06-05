verson 2 of a 2048

https://bokomolol.github.io/chaotic2048V2/

appearently the arrow keys dont work so its still not mobile friendly

heres the randomness factor:
        if (randomValue < 0.02) {
            return 69420; // 2% chance to change to 69420
        } else if (randomValue < 0.12) {
            return value; // 10% chance to stay the same
        } else if (randomValue < 0.32) {
            return value + 1; // 20% chance to add 1
        } else if (randomValue < 0.52) {
            return value - 1; // 20% chance to subtract 1
        } else if (randomValue < 0.77) {
            return -value; // 25% chance to multiply by -1
        } else if (randomValue < 0.84) {
            return `√${value}`; // 7% chance to take the square root
        } else if (randomValue < 0.89) {
            return value + Math.floor(Math.random() * 21) - 10; // 5% chance to add random value between -10 and 10
        }
        return value * 2; // Default merge behavior
    }
