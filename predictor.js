import * as benutils from "@benp2325/benutils";
import { rawCsvData } from "../Data/Sorted/valorant/valo-teams-and-players.js";

const csvData = rawCsvData.trim().split('\n').map(row=>row.split(','));

const feature_selection = {
    "TARGET":20,
    //put features below
    "MAP_WINS":2,
    "TEN_ROUND":3,
    "FIVE_ROUND":4,
    "P1-KPR":5,
    "P1-RATE":6,
    "P1-ADR":7,
    "P2-KPR":8,
    "P2-RATE":9,
    "P2-ADR":10,
    "P3-KPR":11,
    "P3-RATE":12,
    "P3-ADR":13,
    "P4-KPR":14,
    "P4-RATE":15,
    "P4-ADR":16,
    "P5-KPR":17,
    "P5-RATE":18,
    "P5-ADR":19,
}

//csv header safegaurd, default=0 or "no headers"
let start_index = 0;

//safegaurd for csv headers, just removing them because feature_selection handles labels
if(isNaN(parseFloat(csvData[0][feature_selection["TARGET"]]))){
    start_index = 1;
}


let model = window.trainedModel;

const observations = [];

const neuron_labels = [];

for(const feat_name of Object.keys(feature_selection)){
    if(feat_name != "TARGET"){
        neuron_labels.push(feat_name)
    }
}

for(let i = start_index; i<csvData.length; i++){
    const ob = {}
    for(const feat_name of Object.keys(feature_selection)){
        
        if(feat_name != "TARGET"){
            ob[feat_name] = parseFloat(csvData[i][feature_selection[feat_name]]);
            
        }
        
    }
    observations.push(ob);
};

const final_observations = [];

for(let i = 0; i<observations.length; i++){

    final_observations.push(model.predict(observations[i]));
}

window.finalObservations = final_observations;
window.neuronLabels = neuron_labels;

console.log(final_observations)
