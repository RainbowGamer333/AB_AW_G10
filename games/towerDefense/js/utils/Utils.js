//Set of utilities function for the tower defense game
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

    static distance(go1, go2) {
        let x1 = go1.x;
        let y1 = go1.y;
        let x2 = go2.x;
        let y2 = go2.y;

        const distance = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
        //console.log("Distance = " + distance);
        return distance;
    }
}