import {Map} from "life_simulation";

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

const drawBg = () => {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

const render = () => {
    drawBg();
}

const map = Map.new();


render()

var fileInputElement = document.getElementById("file-input");
fileInputElement.addEventListener("change", e => fileInputElement.files[0].text().then((xmlText) => {
    var xmlText = xmlText.replace(/\s/g,"");
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlText,"text/xml");
    var simulation = xmlDoc.getRootNode().childNodes[0];
    var landBounds = simulation.childNodes[0];
    var plants = simulation.childNodes[1];
    var grazers = simulation.childNodes[2];
    var predators = simulation.childNodes[3];
    var obstacles = simulation.childNodes[4];
    
    // map inputs
    map.set_width(parseFloat(landBounds.getElementsByTagName("WIDTH")[0].childNodes[0].nodeValue));
    map.set_height(parseFloat(landBounds.getElementsByTagName("HEIGHT")[0].childNodes[0].nodeValue));

    // plant metadata
    map.set_init_plant_count(parseInt(plants.getElementsByTagName("INITIAL_PLANT_COUNT")[0].childNodes[0].nodeValue));
    map.set_growth_rate(parseFloat(plants.getElementsByTagName("GROWTH_RATE")[0].childNodes[0].nodeValue));
    map.set_max_size(parseInt(plants.getElementsByTagName("MAX_SIZE")[0].childNodes[0].nodeValue));
    map.set_max_seed_cast_distance(parseInt(plants.getElementsByTagName("MAX_SEED_CAST_DISTANCE")[0].childNodes[0].nodeValue));
    map.set_max_seed_number(parseInt(plants.getElementsByTagName("MAX_SEED_NUMBER")[0].childNodes[0].nodeValue));
    map.set_max_size(parseFloat(plants.getElementsByTagName("MAX_SIZE")[0].childNodes[0].nodeValue));
    map.set_seed_viability(parseFloat(plants.getElementsByTagName("SEED_VIABILITY")[0].childNodes[0].nodeValue));
    
    plants = plants.getElementsByTagName("PLANT");
    for (var plant of plants) {
        var plantX = parseInt(plant.getElementsByTagName("X_POS")[0].childNodes[0].nodeValue);
        var plantY = parseInt(plant.getElementsByTagName("Y_POS")[0].childNodes[0].nodeValue);
        var plantD = parseInt(plant.getElementsByTagName("P_DIAMETER")[0].childNodes[0].nodeValue);
        map.add_plant(1, plantX, plantY, plantD)
    }

    // grazer metadata
    map.set_init_grazer_count(parseInt(grazers.getElementsByTagName("INITIAL_GRAZER_COUNT")[0].childNodes[0].nodeValue));
    map.set_grazer_energy_input(parseInt(grazers.getElementsByTagName("G_ENERGY_INPUT")[0].childNodes[0].nodeValue));
    map.set_grazer_energy_output(parseInt(grazers.getElementsByTagName("G_ENERGY_OUTPUT")[0].childNodes[0].nodeValue));
    map.set_grazer_energy_to_reproduce(parseInt(grazers.getElementsByTagName("G_ENERGY_TO_REPRODUCE")[0].childNodes[0].nodeValue));
    map.set_grazer_maintain_speed(parseFloat(grazers.getElementsByTagName("G_MAINTAIN_SPEED")[0].childNodes[0].nodeValue));
    map.set_grazer_max_speed(parseFloat(grazers.getElementsByTagName("G_MAX_SPEED")[0].childNodes[0].nodeValue));

    grazers = grazers.getElementsByTagName("GRAZER");
    for (var grazer of grazers) {
        var grazerX = parseInt(grazer.getElementsByTagName("X_POS")[0].childNodes[0].nodeValue);
        var grazerY = parseInt(grazer.getElementsByTagName("Y_POS")[0].childNodes[0].nodeValue);
        var grazerEnergy = parseInt(grazer.getElementsByTagName("G_ENERGY_LEVEL")[0].childNodes[0].nodeValue);
        map.add_grazer(grazerX, grazerY, grazerEnergy)
    }

    // predator metadata
    map.set_init_predator_count(parseInt(predators.getElementsByTagName("INITIAL_PREDATOR_COUNT")[0].childNodes[0].nodeValue));
    map.set_max_speed_hod(parseFloat(predators.getElementsByTagName("MAX_SPEED_HOD")[0].childNodes[0].nodeValue));
    map.set_max_speed_hed(parseFloat(predators.getElementsByTagName("MAX_SPEED_HED")[0].childNodes[0].nodeValue));
    map.set_max_speed_hor(parseFloat(predators.getElementsByTagName("MAX_SPEED_HOR")[0].childNodes[0].nodeValue));
    map.set_predator_maintain_speed(parseFloat(predators.getElementsByTagName("P_MAINTAIN_SPEED")[0].childNodes[0].nodeValue));
    map.set_predator_energy_output(parseInt(predators.getElementsByTagName("P_ENERGY_OUTPUT")[0].childNodes[0].nodeValue));
    map.set_predator_energy_to_reproduce(parseInt(predators.getElementsByTagName("P_ENERGY_TO_REPRODUCE")[0].childNodes[0].nodeValue));
    map.set_predator_max_offspring(parseInt(predators.getElementsByTagName("P_MAX_OFFSPRING")[0].childNodes[0].nodeValue));
    map.set_predator_gestation(parseFloat(predators.getElementsByTagName("P_GESTATION")[0].childNodes[0].nodeValue));
    map.set_predator_offspring_energy(parseInt(predators.getElementsByTagName("P_OFFSPRING_ENERGY")[0].childNodes[0].nodeValue));
    
    predators = predators.getElementsByTagName("PREDATOR");
    for (var predator of predators) {
        var predatorX = parseInt(predator.getElementsByTagName("X_POS")[0].childNodes[0].nodeValue);
        var predatorY = parseInt(predator.getElementsByTagName("Y_POS")[0].childNodes[0].nodeValue);
        var predatorEnergy = parseInt(predator.getElementsByTagName("P_ENERGY_LEVEL")[0].childNodes[0].nodeValue);
        var genes = predator.getElementsByTagName("GENOTYPE")[0].childNodes[0].nodeValue;
        map.add_predator(predatorX, predatorY, predatorEnergy, genes);
    }    

    var rocks = obstacles.getElementsByTagName("OBSTACLE");
    for (var rock of rocks) {
        var rockX = parseInt(rock.getElementsByTagName("X_POS")[0].childNodes[0].nodeValue);
        var rockY = parseInt(rock.getElementsByTagName("Y_POS")[0].childNodes[0].nodeValue);
        var rockD = parseInt(rock.getElementsByTagName("O_DIAMETER")[0].childNodes[0].nodeValue);
        var rockH = parseInt(rock.getElementsByTagName("O_HEIGHT")[0].childNodes[0].nodeValue);
        map.add_rock(rockX, rockY, rockD, rockH);
    }

    console.log(map)
    console.log(map.get_grazers())
    console.log(map.get_rocks())
    console.log(map.get_predators())
    console.log(map.get_plants())

    
    
}));
