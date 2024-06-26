//Dynamic Path for the textures
export class Path {
    //BASE
    static BASE_PATH = "asset/";

    //TILES
    static GRASS = Path.BASE_PATH+"grass.png";

    //TOWERS
    static TOWERS_DATA = Path.BASE_PATH +"tower_data.json"
    static BASE_PATH_TOWER = Path.BASE_PATH + "/tower/";
    static CANON = Path.BASE_PATH_TOWER+"canon.png";
    static MINI_CANON = Path.BASE_PATH_TOWER+"mini_canon.png";
    static DOUBLE_CANON = Path.BASE_PATH_TOWER+"double_canon.png";
    static LIGHTNING_TOWER = Path.BASE_PATH_TOWER+"tesla.png";
    static WALL = Path.BASE_PATH_TOWER+"wall.png";
    static LOW_WALL = Path.BASE_PATH_TOWER+"low_wall.png";
    static LANDMINE = Path.BASE_PATH_TOWER+"landmine.png";
    static GOLDEN_TREE = Path.BASE_PATH_TOWER+"golden_tree.png";
    static FIRE_CANON = Path.BASE_PATH_TOWER+"fire_canon.png";
    static ICE_CANON = Path.BASE_PATH_TOWER+"ice_canon.png";
    static BIDIRECTIONAL_SONAR = Path.BASE_PATH_TOWER+"bidirectional_sonar.png";
    // static CATAPULT = Path.BASE_PATH+"/tower/catapult.png";

    //Projectiles
    static BASE_PATH_PROJECTILE = Path.BASE_PATH + "projectile/";
    static FIREBALL = Path.BASE_PATH_PROJECTILE+"fireball.png";
    static FROSTSHARD = Path.BASE_PATH_PROJECTILE+"frostshard.png";
    static FIREBALL_SMALL = Path.BASE_PATH_PROJECTILE+"fireball_small.png";
    static CANON_BALL = Path.BASE_PATH_PROJECTILE+"canon_ball.png";
    static LIGHTNING = Path.BASE_PATH_PROJECTILE+"lightning.png";
    static SONAR_BEAM = Path.BASE_PATH_PROJECTILE+"sonar.png";
    static ANNIHILATOR_BEAM = Path.BASE_PATH_PROJECTILE+"annihilator_beam.png";
    static ANNIHILATOR_VACUUM = Path.BASE_PATH_PROJECTILE+"annihilator_vacuum.png";


    //PARTICLES
    static BASE_PATH_PARTICLE = Path.BASE_PATH + "particle/";
    static GHOST = Path.BASE_PATH_PARTICLE+"ghost.png";
    static HITMARKER_DAMAGE = Path.BASE_PATH_PARTICLE+"hitmarker_damage.png";
    static HITMARKER_HEAL = Path.BASE_PATH_PARTICLE+"hitmarker_heal.png";
    static EXPLOSION = Path.BASE_PATH_PARTICLE+"explosion.png";


    //ENEMIES
    static BASE_PATH_ENEMY = Path.BASE_PATH + "enemy/";
    static GOBLIN = Path.BASE_PATH_ENEMY+"goblin.png";
    static OGRE = Path.BASE_PATH_ENEMY+"ogre.png";
    static DEMON = Path.BASE_PATH_ENEMY+"demon.png";
    static GOLIATH = Path.BASE_PATH_ENEMY+"goliath.png";
    static NECROMANCER = Path.BASE_PATH_ENEMY+"necromancer.png";
    static SKELETON = Path.BASE_PATH_ENEMY+"skeleton.png";


    //Building
    static BASE_PATH_BUILDING = Path.BASE_PATH + "building/";
    static HOUSE_RED = Path.BASE_PATH_BUILDING+"house_red.png";
    static HOUSE_BLUE = Path.BASE_PATH_BUILDING+"house_blue.png";
    static HOUSE_TINY = Path.BASE_PATH_BUILDING+"house_tiny.png";
    static FOUNTAIN = Path.BASE_PATH_BUILDING+"fountain.png";
    static HOUSE_TINY_TINY = Path.BASE_PATH_BUILDING+"house_tiny_tiny.png";
}