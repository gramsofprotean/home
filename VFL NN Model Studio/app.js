import * as benutils from "@benp2325/benutils";
import { rawCsvData } from "./housing.js";

const RunButton = document.getElementById("RunButton");
const RankingsBox = document.getElementById("PlayerRankings");

let frameCounter = 0;
function frameCount() {
    frameCounter++;
    if (frameCounter == 600) {
        frameCounter = 0;
    }
    requestAnimationFrame(frameCount);
}

async function run_visualizer() {
    await import('./predictor.js')
    await import('./network-visualizer/model-visualization.js')
    await import('./network-visualizer/model-metric-grapher.js')
}

requestAnimationFrame(frameCount);
console.log("Frame Counter:", frameCounter);

RunButton.addEventListener("click", function () {
    const generated_seed = performance.now();
    const runwin = window.open("", "RunWindow", "width=1000, height=800");
     runwin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Run Settings</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .form-group { margin-bottom: 12px; }
                label { display: block; margin-bottom: 4px; font-weight: bold; }
                input, select { width: 100%; padding: 6px; box-sizing: border-box; }
                button { margin-top: 10px; padding: 8px 15px; background: #007BFF; color: white; border: none; cursor: pointer; }
            </style>
        </head>
        <body>
        <h2>Model Creation</h2>
            <div class="form-group">
                <label for="Seed">Seed:</label>
                <input type="number" id="Seed" name="Seed" placeholder="Generated from web-interactions, settable for re-testing (current gen:${generated_seed})">
            </div>

            <div class="form-group">
                <label for="Count">Hidden Layer Count:</label>
                <input type="number" id="Count" name="Count" placeholder="Enter a number (default: 2)">
            </div>

            <div class="form-group">
                <label for="init_size">Initial Layer Size:</label>
                <input type="number" id="init_size" name="init_size" placeholder="Enter a number (default: 8)">
            </div>

            <div class="form-group">
                <label for="Style">Architecture Type:</label>
                <select id="Style" name="Style">
                    <option value="">Select your architecture preset</option>
                    <option value="po2">Po2</option>
                    <option value="flat">Flat(default)</option>
                    <option value="hourglass">Hourglass</option>
                </select>
            </div>

            <div class="form-group">
                <label for="init_size">Hourglass Operator:</label>
                <input type="text" id="hg_operator" name="hg_operator" placeholder="If hourglass architecture: /(default), *, **, or sqroot">
            </div>

            <div class="form-group">
                <label for="Activation">Activation:</label>
                <select id="Activation" name="Activation">
                    <option value="">Select an activation function</option>
                    <option value="relu">ReLU (Default)</option>
                    <option value="sigmoid">Sigmoid</option>
                    <option value="tanh">Tanh</option>
                    <option value="leaky_relu">Leaky ReLU</option>
                </select>
            </div>

            <div class="form-group">
                <label for="tt_split">Train/Test Split (test):</label>
                <input type="number" id="tt_split" name="tt_split" step="0.05" placeholder="Enter a number (default: 0.25)">
            </div>

            <div class="form-group">
                <label for="Learn_Rate">Learning Rate:</label>
                <input type="number" id="Learn_Rate" name="Learn_Rate" step="0.001" placeholder="Enter a number (default: 0.01)">
            </div>

            <div class="form-group">
                <label for="epochs">epochs:</label>
                <input type="number" id="epochs" name="epochs" placeholder="Enter a number (default: 100)">
            </div>

        <h2>Output Settings</h2>

            <div class="form-group">
                <label for="Activation_out">Activation:</label>
                <select id="Activation_out" name="Activation_out">
                    <option value="">Select an activation function</option>
                    <option value="none">None (Default)</option>
                    <option value="relu">ReLU</option>
                    <option value="sigmoid">Sigmoid</option>
                    <option value="tanh">Tanh</option>
                    <option value="leaky_relu">Leaky ReLU</option>
                </select>
            </div>

            
            <button id="submitRun">Run Process</button>
        </body>
        </html>
    `);

runwin.document.close();

runwin.document.getElementById("submitRun").addEventListener("click", function() {

    const run_settings = {
        count: Number(runwin.document.getElementById("Count").value || 2),
        init_size: Number(runwin.document.getElementById("init_size").value || 8),
        style: runwin.document.getElementById("Style").value || "flat",
        activation: runwin.document.getElementById("Activation").value || "relu",
        learn_rate: Number(runwin.document.getElementById("Learn_Rate").value || 0.01),
        activation_out: runwin.document.getElementById("Activation_out").value || "none",
        epochs: Number(runwin.document.getElementById("epochs").value || 100),
        tt_split: Number(runwin.document.getElementById("tt_split").value || 0.25),
        hg_operator: runwin.document.getElementById("hg_operator").value || "/",
        seed: Number(runwin.document.getElementById("Seed").value || generated_seed)
    };

    const feature_selection = {
    "TARGET":13,
    //put features below
    "RM":5,
    "AGE":6,
    "TAX":9,
    "LSTAT":12,
    "CRIM":0
    }

    const model = benutils.neuralnet({
        hidden_layer_info: {
            count:run_settings.count, 
            init_size:run_settings.init_size, 
            style:run_settings.style
        },
        random_seed:run_settings.seed,
        activation:run_settings.activation,
        learn_rate:run_settings.learn_rate,
        output_layer_info:{init_size:1, activation:run_settings.activation_out},
        epochs:run_settings.epochs,
        tt_split:run_settings.tt_split
    });

    runwin.close();
    console.log("Frame Count: ", frameCounter);

    run_visualizer()

    model.set_features_csv(rawCsvData, feature_selection);
    benutils.normalize_features(model);

    console.log(model)

    model.train();
    model.test();

    window.trainedModel = model;
});

    /*const submitRunButton = runwin.document.getElementById("submitRun");
    submitRunButton.addEventListener("click", function () {
        runwin.close();
        const PlayerList = Object.entries(window.finalOutput);
        console.log(PlayerList);

        PlayerList.sort(function (a, b) {
            return b[1].PredictedScore - a[1].PredictedScore;
        });

        RankingsBox.innerHTML = `
            <div class="ranking-row ranking-header">
                <div>Rank</div>
                <div>Player</div>
                <div>Team</div>
                <div>Role</div>
                <div>Predicted Score</div>
            </div>
        `;

        PlayerList.forEach(function (player, index) {

            const PlayerName = player[0];
            const PlayerStats = player[1];

            RankingsBox.innerHTML += `
                <div class="ranking-row">
                    <div>${index + 1}</div>
                    <div>${PlayerName}</div>
                    <div>${PlayerStats.Team}</div>
                    <div>${PlayerStats.Role}</div>
                    <div>${PlayerStats.PredictedScore}</div>
                </div>
            `;
        });
    });
    */
});
