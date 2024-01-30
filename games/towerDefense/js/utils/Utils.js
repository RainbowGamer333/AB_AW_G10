export class Utils{
    static randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomIndexFromTrueBooleans(list){
        let trueIndexes = [];
        for (let i = 0; i < list.length; i++){
            let val = list[i];
            if(val==true){
                trueIndexes.push(i);
            }
        }
        const choices = this.randomIntFromInterval(0,trueIndexes.length-1);
        return trueIndexes[choices];
    }
}