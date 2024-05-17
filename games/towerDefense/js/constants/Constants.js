//Game constants
export class Constants {


    static colums = 9;
    static rows = 12;

    static TILE_SIZE = 32;
    static ZOOM_FACTOR = 1.0;
    static TILE_SIZE_ZOOMED = Constants.TILE_SIZE * Constants.ZOOM_FACTOR;

    static width= Constants.colums * Constants.TILE_SIZE_ZOOMED;
    static height=  Constants.rows * Constants.TILE_SIZE_ZOOMED;
}