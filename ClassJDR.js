const prompt = require('prompt-sync')({sigint: true});

/**
 * Create Class Village
 */
class Village {

    //Variables
    _nbVillageois;
    _nbBois;
    _nbPierre;
    _nbOr;
    _Batiments;
    _tour = 0;
    _HDV

    /**
     * Constructor of the Class
     * @param nbVillageois
     * @param nbBois
     * @param nbPierre
     * @param nbOr
     * @param Batiments
     */
    constructor(nbVillageois = 1, nbBois = 1000, nbPierre = 1000, nbOr = 0, Batiments = ['HDV']) {
        this._nbVillageois = nbVillageois;
        this._nbBois = nbBois;
        this._nbPierre = nbPierre;
        this._nbOr = nbOr;
        this._Batiments = Batiments;
        this._HDV = new Batiment(1, ['HDV'], 10, 0, 2);
    }

    //Getters and Setters

    /**
     * @returns {*}
     */
    get nbVillageois() {
        return this._nbVillageois;
    }

    /**
     * @param value
     */
    set nbVillageois(value) {
        this._nbVillageois = value;
    }

    /**
     * @returns {*}
     */
    get nbBois() {
        return this._nbBois;
    }

    /**
     * @param value
     */
    set nbBois(value) {
        this._nbBois = value;
    }

    /**
     * @returns {*}
     */
    get nbPierre() {
        return this._nbPierre;
    }

    /**
     * @param value
     */
    set nbPierre(value) {
        this._nbPierre = value;
    }

    /**
     * @returns {*}
     */
    get nbOr() {
        return this._nbOr;
    }

    /**
     * @param value
     */
    set nbOr(value) {
        this._nbOr = value;
    }

    /**
     * @returns {*}
     * @constructor
     */
    get Batiments() {
        return this._Batiments;
    }

    /**
     * @param value
     * @constructor
     */
    set Batiments(value) {
        this._Batiments = value;
    }

    /**
     * Launching the game
     * @returns {void|*}
     */
    jouerTour() {
        //Restart the game as long as the hp of the Town Hall isn't at 0
        while (this._HDV.hp !== 0) {

            //Display the resources available to the player
            console.log("Les ressources disponibles sont : " + this.nbBois + " bois | " + this.nbPierre + " pierres | " + this.nbOr + " or.");

            /**
             * Ask the player the desired action
             * @type {string}
             */
            let demande = prompt("Que souhaitez-vous faire ? " +
                " Construire mine de pierre ? (pierre) " +
                " Construrie scierie ? (bois) " +
                " Construire mine d'or (or) " +
                " Restaurer HP d'un batiment (hp) " +
                " Ne rien faire ?");

            //Carry out the action according to the desired action
            switch (demande.toLowerCase()) {
                //If action is create Stone Mine
                case("pierre"):
                    if (this.createBatiment("MINEP") === false) {
                        if (this.construireMine() === false) {
                            console.log("Il n'y a pas assez de ressources");
                        } else {
                            this.minePierre = new Batiment(1, 'MINEP', 100, 50, 2);
                        }
                    } else {
                        this.construireMine();
                        this.minePierre.ajoutNbBatiment();
                        this.minePierre.retirerHP();
                    }
                    this.prodPierre = this.minePierre.nombre * this.minePierre.production;
                    break;

                //If action is create Sawmill
                case("bois"):
                    if (this.createBatiment("SCIE") === false) {
                        if (this.construireScierie() === false) {
                            console.log("Il n'y a pas assez de ressources");
                        } else {
                            this.scierie = new Batiment(1, 'SCIE', 100, 50, 2);
                        }
                    } else {
                        this.construireScierie();
                        this.scierie.ajoutNbBatiment();
                        this.scierie.retirerHP();
                    }
                    this.prodBois = this.scierie.nombre * this.scierie.production;
                    break;

                //If action is create Gold Mine
                case("or"):
                    if (this.createBatiment("MINEOP") === false) {
                        if (this.construireMineOr() === false) {
                            console.log("Il n'y a pas assez de ressources");
                        } else {
                            this.mineOr = new Batiment(1, 'MINEO', 100, 50, 2);
                        }
                    } else {
                        this.construireMineOr();
                        this.mineOr.ajoutNbBatiment();
                        this.mineOr.retirerHP();
                    }
                    this.prodOr = this.mineOr.nombre * this.mineOr.production;
                    break;

                //If action is restore HP
                case("hp"):
                    /**
                     * Ask the player the desired building for the restoration
                     * @type {string}
                     */
                    let demandeRestauration = prompt("Quel bâtiment aimeriez-vous restaurer ? " +
                        " Restaurer mine de pierre ? (mine pierre) " +
                        " Restaurer scierie ? (scierie) " +
                        " Restaurer mine d'or (mine or) " +
                        " Restaurer mairie (mairie) " +
                        " Ne rien faire ?");

                    //Carry out the action according to the desired action
                    switch (demandeRestauration.toLowerCase()) {
                        //If Stone Mine restoration
                        case("pierre"):
                            this.restaurationPierre = this.minePierre.restaureHP(this.nbOr);
                            console.log("Restaure : " + this.restaurationPierre[0] + " nouveau solde or : " + this.restaurationPierre[1]);
                            break;

                        //If Sawmill restoration
                        case("bois"):
                            this.restaurationBois = this.scierie.restaureHP(this.nbOr);
                            console.log("Restaure : " + this.restaurationBois[0] + " nouveau solde or : " + this.restaurationBois[1]);
                            break;

                        //If Gold Mine restoration
                        case ("or"):
                            this.restaurationOr = this.mineOr.restaureHP(this.nbOr);
                            console.log("Restaure : " + this.restaurationOr[0] + " nouveau solde or : " + this.restaurationOr[1]);
                            break;

                        //Si Town Hall restoration
                        case ("mairie"):
                            this.restaurationHDV = this._HDV.restaureHP(this.nbOr);
                            this._HDV._hp = this.restaurationHDV[2];
                            console.log("Restaure : " + this.restaurationHDV[0] + " nouveau solde or : " + this.restaurationHDV[1]);
                            console.log(this._HDV);
                            break;
                    }
                    break;
            }

            //Withdrawal of HP for the Town Hall
            this._HDV.retirerHP();

            //Zeroing of production if considered undefined
            if (this.prodPierre === undefined) {
                this.prodPierre = 0;
            }
            if (this.prodBois === undefined) {
                this.prodBois = 0;
            }
            if (this.prodOr === undefined) {
                this.prodOr = 0;
            }

            //Display general production
            console.log("Production générale :" + this._HDV.produire(this.prodPierre, this.prodBois, this.prodOr));

            //Gold production setters
            this.nbOr = this.prodOr;

            //Test the HP of Town Hall
            console.log(this._HDV);

            //Add a new tour
            this._tour += 1;

            //New Game
            return this.jouerTour();
        }

        //Display the number of turns played
        return (console.log("Vous avez joué " + this._tour));
    }

    /**
     * Check if a building has already been created
     * @param nameBatiment
     * @returns {boolean|*}
     */
    createBatiment(nameBatiment) {
        this.result = this._Batiments.includes(nameBatiment) !== false;
        return this.result;
    }

    /**
     * Build a Stone Mine
     * @returns {boolean|*}
     */
    construireMine() {
        this.result = false;
        if (this._Batiments.includes("MINEP") && this.nbPierre > 100) {
            this._nbPierre -= 100;
            this.result = true;
        } else if (this._nbPierre > 100) {
            this._nbPierre -= 100;
            this._Batiments.push("MINEP");
            this.result = true;
        }
        return this.result;
    }

    /**
     * Build a Sawmill
     * @returns {boolean|*}
     */
    construireScierie() {
        this.result = false;
        if (this._Batiments.includes("SCIE") && this.nbBois > 100) {
            this._nbBois -= 100;
            this.result = true;
        } else if (this._nbBois > 100) {
            this._nbBois -= 100;
            this._Batiments.push("SCIE");
            this.result = true;
        }
        return this.result;
    }

    /**
     * Build a Gold Mine
     * @returns {boolean|*}
     */
    construireMineOr() {
        this.result = false;
        if (this._Batiments.includes("MINEO") && (this.nbBois > 100 && this.nbPierre > 100)) {
            this._nbBois -= 100;
            this._nbPierre -= 100;
            this.result = true;
        } else if (this._nbBois > 100 && this._nbPierre > 100) {
            this._nbBois -= 100;
            this._nbPierre -= 100;
            this._Batiments.push('MINEO');
            this.result = true;
        }
        return this.result;
    }
}

/**
 * Create Class Batiment
 */
class Batiment {

    //Variables
    _nombre;
    _type;
    _hp;
    _production;
    _coutReparation;

    /**
     * Constructor of the Class
     * @param nombre
     * @param type
     * @param hp
     * @param production
     * @param coutReparation
     */
    constructor(nombre = 1, type, hp, production, coutReparation) {
        this._nombre = nombre;
        this._type = type;
        this._hp = hp;
        this._production = production;
        this._coutReparation = coutReparation;
    }

    //Getters and Setters

    /**
     * @returns {*}
     */
    get nombre() {
        return this._nombre;
    }

    /**
     * @param value
     */
    set nombre(value) {
        this._nombre = value;
    }

    /**
     * @returns {*}
     */
    get type() {
        return this._type;
    }

    /**
     * @param value
     */
    set type(value) {
        this._type = value;
    }

    /**
     * @returns {*}
     */
    get hp() {
        return this._hp;
    }

    /**
     * @param value
     */
    set hp(value) {
        this._hp = value;
    }

    /**
     * @returns {*}
     */
    get production() {
        return this._production;
    }

    /**
     * @param value
     */
    set production(value) {
        this._production = value;
    }

    /**
     * @returns {*}
     */
    get coutReparation() {
        return this._coutReparation;
    }

    /**
     * @param value
     */
    set coutReparation(value) {
        this._coutReparation = value;
    }

    /**
     * Add a number of building from a building of the same type
     */
    ajoutNbBatiment() {
        this._nombre += 1;
    }

    /**
     * Retire HP from the building
     */
    retirerHP() {
        this.hp = this._hp - (1 * this.nombre);
    }

    /**
     * Restore HP to the building depending on th amount of gold available
     * @param orDisponible
     * @returns {string|(boolean|*|number)[]}
     */
    restaureHP(orDisponible) {
        this.result = false;
        if (orDisponible > (this.nombre * 2)) {
            this.orApresRestauration = orDisponible - (this.nombre * 2);
            this._hp += + 1;
            this.result = true;
        }
        if (this.result) {
            return [this.result, this.orApresRestauration, this._hp];
        } else {
            return ("Impossible à restaurer car manque d'or")
        }
    }

    /**
     * Return the production of resources
     * Return total production
     * @param prodPierre
     * @param prodBois
     * @param prodOr
     * @returns {string}
     */
    produire(prodPierre, prodBois, prodOr){
        this.total = prodPierre + prodBois + prodOr;
        return (" Pierre : " + prodPierre + " | Bois : " + prodBois + " Or : " + prodOr + " | Production total " + this.total);
    }

}


//Game test
/**
 * Set up a village
 * @type {Village}
 */
let village = new Village();

/**
 * Start a new game
 */
village.jouerTour();