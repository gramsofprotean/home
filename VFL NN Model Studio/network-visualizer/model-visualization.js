const svgNS = "http://www.w3.org/2000/svg";

const model = window.trainedModel;

const obs_slider = document.getElementById('obs-slider');

const neuron_labels = window.neuronLabels;
console.log(window.neuronLabels)

const final_observations = window.finalObservations

function update_neurons(){
    obs_num = obs_slider.value;
    observation = {layers:final_observations[obs_num][1]}
}

obs_slider.max = window.finalObservations.length - 1;
obs_slider.value = 0;

let obs_num = obs_slider.value;

let observation = {layers:final_observations[obs_num][1]};

let layer_count = Object.keys(model.layers).length;

let neurons_per_layer = 6;

const layer_containers = [];

const neuron_containers = [];

const svg_containers = [];

const weight_svgs = [];

const weight_lines = [];

const neurons = [];

const layer_neuron_lists = [];

const body = document.querySelector('.main');

export const main = document.querySelector('.main');

const layer_info = document.querySelector('.model-info');

const neuron_info = document.getElementsByClassName('.neuron-info')

const side_panel = document.querySelector('.side-panel');

const neuron_info_containers = [];

const neuron_info_elements = [];

let brightest_green = 0;

let brightest_red = 0;

let highest_weight_value = 0;

let lowest_weight_value = 0;

function build_neuron_info(){
    for(let i = 0; i < 15; i++){
        const newNeuronInfoContainerDiv = document.createElement('div');
        newNeuronInfoContainerDiv.setAttribute('class', 'neuron-info-container');

        const newNeuronInfoP = document.createElement('p');
        newNeuronInfoP.setAttribute('class', 'neuron-info');
        newNeuronInfoP.dataset.index = i;
        newNeuronInfoP.innerHTML = 'HOVER OVER NEURON';
         
        
        newNeuronInfoContainerDiv.append(newNeuronInfoP);
        side_panel.append(newNeuronInfoContainerDiv);

        neuron_info_containers.push(newNeuronInfoContainerDiv);
        neuron_info_elements.push(newNeuronInfoP)
    }
}

function build_layers(){
    for(const layer_name of Object.keys(model.layers)){
        const newLayerDiv = document.createElement('div');
        newLayerDiv.className = 'layer';
        newLayerDiv.id = `${layer_name}`;
        layer_containers.push(newLayerDiv);
        main.append(newLayerDiv);
    }
}

function populate_layers(){
    for(const layer of layer_containers){
        for(let i = 0; i < model.layers[layer.id]["output"].length; i++){
            const newNeuronContainer = document.createElement('div');
            newNeuronContainer.className = 'neuron-container';
            
            neuron_containers.push(newNeuronContainer);
            layer.append(newNeuronContainer);
        }
    } 
}

function populate_neuron_containers(){
    for(const con of neuron_containers){
        const newSvgContainer = document.createElementNS(svgNS, 'svg');
        newSvgContainer.setAttribute('class', 'svg-container');
        newSvgContainer.setAttribute('viewBox', '0 0 100 100');
        svg_containers.push(newSvgContainer);
        con.append(newSvgContainer);
    } 
}

function populate_svgs(){
    let neuron_list_index = 0;

    for(const layer of layer_containers){
        const layer_name = layer.id;
        const neuron_outputs = observation.layers[layer_name]['output'];

        const layer_svg_containers = layer.querySelectorAll('.svg-container');

        const temp_neuron_list = [];
        
        layer_svg_containers.forEach((con, i) => {
            const newNeuron = document.createElementNS(svgNS, 'circle');
            newNeuron.setAttribute('class', 'neuron');
            newNeuron.setAttribute('cx', '50');
            newNeuron.setAttribute('cy', '50');
            newNeuron.setAttribute('r', '50');

            newNeuron.dataset.layer = layer_name;
            newNeuron.dataset.layer_index = neuron_list_index;
            newNeuron.dataset.index = i;

            const set_value = neuron_outputs[i];
            newNeuron.dataset.value = set_value;

            newNeuron.addEventListener('mouseenter', (e) =>{
                update_neurons();

                const target = e.target;
                
                const neuron_values = observation.layers[target.dataset.layer]['output'];
                
                let neuron_preactivation_values = observation.layers[target.dataset.layer]['preactivation']

                let neuron_bias_values = null;

                if(target.dataset.layer == 'input_layer'){
                    neuron_preactivation_values = null;
                } else {
                    neuron_bias_values = model.layers[target.dataset.layer]['main']['biases'];
                }

                const layer_neuron_count = neuron_values.length;

                let starting_value = Number(target.dataset.index) - 7;
                let finishing_value = Number(target.dataset.index) + 8;
                
                let temp_count = 0;

                if(starting_value<0){
                    temp_count = starting_value*-1;
                    starting_value = 0;
                }
                if(finishing_value>layer_neuron_count){
                    finishing_value = layer_neuron_count;
                }

                
                for(i = 0; i < neuron_info_elements.length; i++){
                    neuron_info_elements[i].innerHTML = "";
                    neuron_info_elements[i].setAttribute('style', 'font-weight: normal;');
                }
                
                for(let i = starting_value; i < finishing_value; i++){
                    neuron_info_elements[temp_count].innerHTML = `n${i}: ${neuron_values[i].toFixed(4)} |
                     LABEL: ${neuron_labels[i]}`;
                    if(neuron_preactivation_values != null){
                        neuron_info_elements[temp_count].innerHTML = `n${i}: ${(parseFloat(neuron_preactivation_values[i])-parseFloat(neuron_bias_values[i])).toFixed(3)}
                         + bias: ${neuron_bias_values[i].toFixed(3)}
                          | Activated: ${neuron_values[i].toFixed(3)}`;
                    }
                    if(target.dataset.layer == "output_layer"){
                        neuron_info_elements[temp_count].innerHTML += `| PREDICTION: ${final_observations[obs_num][0].toFixed(3)}`
                    }
                    neuron_info_elements[temp_count].parentElement.setAttribute('style', 'background-color: transparent;');
                    temp_count++;
                }

                neuron_info_elements[7].setAttribute('style', 'font-weight: bold;');
                neuron_info_elements[7].parentElement.setAttribute('style', 'background-color: white; box-shadow: 10px 5px 30px black;');
                

                layer_info.innerHTML = `Current Layer: ${target.dataset.layer}`;
                
                
            });

            temp_neuron_list.push(newNeuron)

            neuron_list_index += 1;

            neurons.push(newNeuron);
            con.append(newNeuron);
        });
        layer_neuron_lists.push(temp_neuron_list);
    }
}


build_neuron_info();
build_layers();
populate_layers();
populate_neuron_containers();
populate_svgs();

const svg_container_elements = document.querySelectorAll('.svg-container');

let smallest_height = svg_containers[0].clientHeight; 
let smallest_width = svg_containers[0].clientWidth;

svg_container_elements.forEach(element => {
    const h = element.clientHeight;
    const w = element.clientWidth;

    if(h < smallest_height && h > 0){
        smallest_height = h;
        smallest_width = w;
    }
})

svg_container_elements.forEach(element => {
    element.style.height =  `${smallest_height}px`;
    element.style.width =  `${smallest_width}px`;
})

requestAnimationFrame(() => {
    const mainRect = main.getBoundingClientRect();
    neurons.forEach(neuron => {
        const rect = neuron.parentElement.getBoundingClientRect();

        neuron.dataset.x = (rect.left - mainRect.left + (rect.width / 2));
        neuron.dataset.y = (rect.top - mainRect.top + (rect.height / 2));
    });
    draw_weights();
    weight_guide.setAttribute('style', `background-image: linear-gradient(to top, 
        rgb(${brightest_red}, 0, 0), rgb(0, 0, 0), 
        rgb(0, 0, 0), rgb(0, ${brightest_green}, 0)
        )`);
    const h_weight = document.getElementById('high');
    const l_weight = document.getElementById('low');

    h_weight.innerHTML = `MAX WEIGHT: ${highest_weight_value.toFixed(2)}`
    h_weight.setAttribute('style', `color: rgb(0, ${brightest_green}, 0)`)
    l_weight.innerHTML = `MIN WEIGHT: ${lowest_weight_value.toFixed(2)}`
    l_weight.setAttribute('style', `color: rgb(${brightest_red}, 0, 0)`)
});

const weightSvg = document.createElementNS(svgNS, 'svg');
weightSvg.setAttribute('class', 'weight-svg');
body.append(weightSvg);

function weight_line(x1, y1, x2, y2, weight){
    
    const newPath = document.createElementNS(svgNS, 'path');
    newPath.setAttribute('class', 'weight-line');
    newPath.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
    
    let red = 0
    let green = Math.min(255, weight*255)
    if(weight<0){
        red = Math.min(255,((weight*-1)*255))
        green = 0
    }
    if(green > brightest_green){
        brightest_green = green;
        highest_weight_value = weight;
    } 
    if(red > brightest_red){
        brightest_red = red;
        lowest_weight_value = weight;
    } 
    
    newPath.setAttribute('stroke', `rgb(${red}, ${green} ,0)`);
    
    newPath.dataset.weight_value = weight;

    weight_lines.push(newPath);
    weightSvg.append(newPath);
}

function draw_weights(){
    const indexed_layers = Object.entries(model.layers)

    let i = 0;

    for(const layer of layer_containers){

        if(i<indexed_layers.length-1){

            const next_layer_container = layer_containers[i + 1];
            const next_layer_neurons = next_layer_container.querySelectorAll('.neuron');

            const next_layer_weights = indexed_layers[i+1][1]["main"]["weights"];
            const layer_neurons = layer.querySelectorAll('.neuron');

            layer_neurons.forEach(neuron => {
                next_layer_weights.forEach((next_layer_neuron_weights, target_index) => {
                
                    const weight = next_layer_neuron_weights[neuron.dataset.index]
                    const target_neuron = next_layer_neurons[target_index]

                    const x1 = parseFloat(neuron.dataset.x)
                    const y1 = parseFloat(neuron.dataset.y)

                    const x2 = parseFloat(target_neuron.dataset.x)
                    const y2 = parseFloat(target_neuron.dataset.y)

                    weight_line(x1, y1, x2, y2, weight);
                });
            });
            i++;
        }
    }    
}

const header_info = {
    model_seed:document.getElementById('model-seed'),
    layer_count:document.getElementById('layer-count'),
    epochs:document.getElementById('epochs'),
    test:document.getElementById('test'),
    activation:document.getElementById('activation'),
    architecture:document.getElementById('architecture'),
    learn_rate:document.getElementById('learn-rate'),
    batch_size:document.getElementById('batch-size'),
    olayer_activation:document.getElementById('olayer-activation')
}

function fill_header_info(){
    header_info.model_seed.innerHTML = `Model Seed: ${model.properties.random_seed}`
    header_info.layer_count.innerHTML = `Layer Count: ${Object.keys(model.layers).length}`
    header_info.epochs.innerHTML = `Epochs: ${model.properties.epochs}`
    header_info.test.innerHTML = `Test%: ${model.properties.tt_split*100}`

    header_info.activation.innerHTML = `Activation: ${model.properties.activation_type}`
    header_info.architecture.innerHTML = `Architecture: ${model.properties.hidden_layer_info.style == "hourglass" ? model.properties.hidden_layer_info.style+", op="+model.properties.hidden_layer_info.hourglass_operation:model.properties.hidden_layer_info.style}`
    header_info.learn_rate.innerHTML = `Learn Rate: ${model.properties.learn_rate}`
    header_info.batch_size.innerHTML = `Batch Size: ${model.properties.batch_size}`
    
    header_info.olayer_activation.innerHTML = `Ouput Layer Activation: ${model.properties.output_layer_info.activation}`
}

export const footer_info = {
    loss:document.getElementById('loss'),
    mse:document.getElementById('mse'),
    rmse:document.getElementById('rmse'),
    mae:document.getElementById('mae'),
    r2:document.getElementById('r2'),
    

    t_loss:document.getElementById('t-loss'),

    t_mse:document.getElementById('t-mse'),
    t_rmse:document.getElementById('t-rmse'),
    t_mae:document.getElementById('t-mae'),
    t_r2:document.getElementById('t-r2')
}

function fill_footer_info(){
    const training_loss_list = model.properties.performance_metrics.training.loss_list
    const first_middle_last_loss = [training_loss_list[0], training_loss_list[Math.round(training_loss_list.length/2)] , training_loss_list[training_loss_list.length-1]];

    const training_mse_list = model.properties.performance_metrics.training.mse_list
    const first_middle_last_mse = [training_mse_list[0], training_mse_list[Math.round(training_mse_list.length/2)] , training_mse_list[training_mse_list.length-1]];

    const training_rmse_list = model.properties.performance_metrics.training.rmse_list
    const first_middle_last_rmse = [training_rmse_list[0], training_rmse_list[Math.round(training_rmse_list.length/2)] , training_rmse_list[training_rmse_list.length-1]];

    const training_mae_list = model.properties.performance_metrics.training.mae_list
    const first_middle_last_mae = [training_mae_list[0], training_mae_list[Math.round(training_mae_list.length/2)] , training_mae_list[training_mae_list.length-1]];

    const training_r2_list = model.properties.performance_metrics.training.r2_list
    const first_middle_last_r2 = [training_r2_list[0], training_r2_list[Math.round(training_r2_list.length/2)] , training_r2_list[training_r2_list.length-1]];

    footer_info.loss.innerHTML = `📈 LOSS: first(${first_middle_last_loss[0].toFixed(3)}) mid(${first_middle_last_loss[1].toFixed(3)}) last(${first_middle_last_loss[2].toFixed(3)})`;
    footer_info.mse.innerHTML = `MSE(DN): first(${first_middle_last_mse[0].toFixed(1)}) mid(${first_middle_last_mse[1].toFixed(2)}) last(${first_middle_last_mse[2].toFixed(2)})`;
    footer_info.rmse.innerHTML = `RMSE: first(${first_middle_last_rmse[0].toFixed(3)}) mid(${first_middle_last_rmse[1].toFixed(3)}) last(${first_middle_last_rmse[2].toFixed(3)})`;
    footer_info.mae.innerHTML = `MAE: first(${first_middle_last_mae[0].toFixed(3)}) mid(${first_middle_last_mae[1].toFixed(3)}) last(${first_middle_last_mae[2].toFixed(3)})`;
    footer_info.r2.innerHTML = `R2: first(${first_middle_last_r2[0].toFixed(3)}) mid(${first_middle_last_r2[1].toFixed(3)}) last(${first_middle_last_r2[2].toFixed(3)})`;

    footer_info.t_loss.innerHTML = `LOSS: ${model.properties.performance_metrics.testing.loss.toFixed(3)}`;
    footer_info.t_mse.innerHTML = `MSE (DN): ${model.properties.performance_metrics.testing.mse.toFixed(3)}`;
    footer_info.t_rmse.innerHTML = `RMSE: ${model.properties.performance_metrics.testing.rmse.toFixed(3)}`;
    footer_info.t_mae.innerHTML = `MAE: ${model.properties.performance_metrics.testing.mae.toFixed(3)}`;
    footer_info.t_r2.innerHTML = `R2: ${model.properties.performance_metrics.testing.r2.toFixed(3)}`;
}

fill_header_info();
fill_footer_info();

const weight_guide = document.querySelector('.weight-guide');







