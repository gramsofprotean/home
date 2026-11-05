import {scatter, plot} from "@benp2325/benutils/vis";
import {main, footer_info} from './model-visualization.js'

const model = window.trainedModel; 

// TRAINING LOSS GRAPHER
const ep = [];

for(let i = 1; i<model.properties.performance_metrics.training.loss_list.length+1; i++){
    ep.push(i);
}

const splot = scatter({
    x_values:ep, 
    y_values:model.properties.performance_metrics.training.loss_list, 
    width:800, 
    height:450, 

    x_label:"epoch", 
    y_label:"loss (training)",

    

    background_color:"lightGrey",
    class_name:"loss-graph",
    connect_points:true

   
});

main.append(splot.plot())


//TESTING PVT GRAPHER
const testing_predict_vs_target = scatter({
    x_values:model.properties.predictions_and_targets.testing.targets, 
    y_values:model.properties.predictions_and_targets.testing.predictions, 
    width:800, 
    height:600, 

    x_label:"real targets(testing)", 
    y_label:"predictions(testing)",

    background_color:"lightGrey",
    class_name:"test-pvt-graph",
    point_size:3
});

main.append(testing_predict_vs_target.plot())


//TRAINING PVT GRAPHER
const targets = model.properties.predictions_and_targets.training.targets
const pvt_predictions = model.properties.predictions_and_targets.training.predictions

const pvt_final_epoch = {targets:targets[targets.length-1],predictions:pvt_predictions[pvt_predictions.length-1]}

const training_predict_vs_target = scatter({
    x_values:pvt_final_epoch.targets,
    y_values:pvt_final_epoch.predictions, 
    width:800, 
    height:600, 

    x_label:"real targets (training, final epoch)", 
    y_label:"predictions(training, final epoch)",


    background_color:"lightGrey",
    class_name:"train-pvt-graph",
    point_size:3
});

main.append(training_predict_vs_target.plot());

/* potential feature, requires graphing rework
//TRAINING RESIDUAL GRAPHER
let residuals = model.properties.predictions_and_targets.training.residuals
let r_predictions = model.properties.predictions_and_targets.training.predictions

const r_final_epoch = {residuals:residuals[residuals.length-1],predictions:r_predictions[r_predictions.length-1]}

let r_min = r_final_epoch.residuals[0]

for(const val of r_final_epoch.residuals){
    r_min = val < r_min ? val : r_min;
}

if(r_min<0){
    const r_add = r_min * -1
    r_final_epoch.residuals = r_final_epoch.residuals.map(val => val + r_add);
}

const training_residuals = scatter({
    x_values:r_final_epoch.predictions,
    y_values:r_final_epoch.residuals,
    width:800, 
    height:600, 
    y_step:2,
    x_step:2,
    x_label:"predictions(training, final epoch)", 
    y_label:"residuals (training, final epoch, made positive)",
    background_color:"lightGrey",
    class_name:"train-residual-graph",
    point_size:3
});

main.append(training_residuals.plot());
*/

//EVENT LISTENERS

//TRAINING LOSS
footer_info.loss.addEventListener('mouseover', (e) =>{
    const loss_graph = document.querySelector('.loss-graph');

    loss_graph.setAttribute('style', 'visibility: visible; background-color: lightGrey; position: absolute;');
});
footer_info.loss.addEventListener('mouseout', (e) =>{
    const loss_graph = document.querySelector('.loss-graph');

    loss_graph.setAttribute('style', 'visibility: hidden; background-color: lightGrey; position: absolute;');
});




//TEST&TRAIN PREDICTIONS VS TARGETS
const test_performance_label = document.getElementById('test-performance-label');

test_performance_label.addEventListener('mouseover', (e) =>{
    const train_performance_graph = document.querySelector('.train-pvt-graph');

    train_performance_graph.setAttribute('style', 'visibility: visible; background-color: lightGrey; position: absolute;');

    const test_performance_graph = document.querySelector('.test-pvt-graph');

    test_performance_graph.setAttribute('style', 'visibility: visible; background-color: lightGrey; position: absolute;');
});
test_performance_label.addEventListener('mouseout', (e) =>{
     const train_performance_graph = document.querySelector('.train-pvt-graph');

    train_performance_graph.setAttribute('style', 'visibility: hidden; background-color: lightGrey; position: absolute;');

    const test_performance_graph = document.querySelector('.test-pvt-graph');

    test_performance_graph.setAttribute('style', 'visibility: hidden; background-color: lightGrey; position: absolute;');
});

const train_performance_label = document.getElementById('train-performance-label');

train_performance_label.addEventListener('mouseover', (e) =>{
    const test_performance_graph = document.querySelector('.test-pvt-graph');

    test_performance_graph.setAttribute('style', 'visibility: visible; background-color: lightGrey; position: absolute;');

    const train_performance_graph = document.querySelector('.train-pvt-graph');

    train_performance_graph.setAttribute('style', 'visibility: visible; background-color: lightGrey; position: absolute;');
});
train_performance_label.addEventListener('mouseout', (e) =>{
    const test_performance_graph = document.querySelector('.test-pvt-graph');

    test_performance_graph.setAttribute('style', 'visibility: hidden; background-color: lightGrey; position: absolute;');

    const train_performance_graph = document.querySelector('.train-pvt-graph');

    train_performance_graph.setAttribute('style', 'visibility: hidden; background-color: lightGrey; position: absolute;');
});

/*potential feature display
//TRAIN&TEST RESIDUAL PLOTS


footer_info.t_mae.addEventListener('mouseover', (e) =>{
    const train_residual_graph = document.querySelector('.train-residual-graph');

    train_residual_graph.setAttribute('style', 'visibility: visible; background-color: lightGrey; position: absolute;');
});
footer_info.t_mae.addEventListener('mouseout', (e) =>{
    const train_residual_graph = document.querySelector('.train-residual-graph');

    train_residual_graph.setAttribute('style', 'visibility: hidden; background-color: lightGrey; position: absolute;');
});
*/

