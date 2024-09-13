#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// PLAYER CLASS
class Player {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    healthDecrease() {
        let health = this.health - 25;
        this.health = health;
    }
    healthIncrease() {
        let health = this.health + 25;
        this.health = health;
    }
}
// OPPENENT CLASS
class Opponent {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    healthDecrease() {
        let health = this.health - 25;
        this.health = health;
    }
}
let player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter your player name:",
});
let opponent = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select your opponent which you want to fight with:",
    choices: ["Skeleton", "Alien", "Monster", "Zombie", "Witch"],
});
console.log(`${chalk.bold.green(player.name)} V/S ${chalk.bold.red(opponent.select)}`);
let p1 = new Player(player.name);
let o1 = new Opponent(opponent.select);
do {
    if (opponent.select === "Skeleton" ||
        opponent.select === "Alien" ||
        opponent.select === "Monster" ||
        opponent.select === "Zombie" ||
        opponent.select === "Witch") {
        let ask = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Choose your option which type to perform action:",
            choices: [
                "Attack",
                "Health drink",
                "Run for life...",
                "Range set",
                "Defend",
            ]
        });
        if (ask.option === "Attack") {
            let point = Math.floor(Math.random() * 2);
            if (point <= 0) {
                p1.healthDecrease();
                console.log(`${p1.name}'s health is ${chalk.bold.red(p1.health)}`);
                console.log(`${o1.name}'s health is ${chalk.bold.green(o1.health)}`);
                if (p1.health <= 0) {
                    console.log(chalk.bold.red(`${p1.name} Lose! Better luck next time.`));
                    process.exit();
                }
            }
            if (point > 0) {
                o1.healthDecrease();
                console.log(`${p1.name}'s health is ${chalk.bold.green(p1.health)}`);
                console.log(`${o1.name}'s health is ${chalk.bold.red(o1.health)}`);
                if (o1.health <= 0) {
                    console.log(chalk.bold.green(`Congratulations ${p1.name}! You Win.`));
                    process.exit();
                }
            }
        }
        if (ask.option === "Health drink") {
            p1.healthIncrease();
            console.log(`${p1.name}'s health is ${chalk.bold.green(p1.health)}`);
        }
        if (ask.option === "Run for life...") {
            console.log(chalk.bold.red(`${p1.name} Lose! Better luck next time.`));
            process.exit();
        }
    }
} while (true);
