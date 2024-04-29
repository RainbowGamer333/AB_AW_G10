

export default class EnemyWave {
    spawnInterval;
    enemyList = [];
    currentSpawnIndex = 0;
    deadEnemyCount = 0;

    constructor(spawnInterval,waveParameters) {
        // console.log("creating enemy wave")
        this.spawnInterval = spawnInterval;
        // 1. Intanciation de tout les mobs
        this.enemyList = this.createEnemies(waveParameters);
        // 2. Shuffle des mobs
        this.enemyList = this.shuffle(this.enemyList);

        // Spawn selon un index
    }

    spawnNextEnemy(){
        const enemy = this.enemyList[this.currentSpawnIndex];
        this.currentSpawnIndex++;
        return enemy;

    }


    createEnemies(waveParameters) {
        let enemies = [];
        for (const enemyType in waveParameters) {
            if (waveParameters.hasOwnProperty(enemyType)) {
                const parameter = waveParameters[enemyType];
                for (let i = 0; i < parameter.amount; i++) {
                    enemies.push( parameter.spawnFunc() );
                }
            }
        }
        return enemies;
    }

    isFinished (){
        return this.enemyList.length === this.deadEnemyCount;
    }

    shuffle(array) {
        // Algorithme de mélange de Fisher-Yates
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    notifyDeath(){
        this.deadEnemyCount++;
    }


}