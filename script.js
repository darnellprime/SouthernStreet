const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    // Background color
    scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.03, 1);

    // CAMERA
    const camera = new BABYLON.UniversalCamera(
        "camera",
        new BABYLON.Vector3(0, 8, -20),
        scene
    );

    camera.setTarget(new BABYLON.Vector3(0, 3, 0));

    camera.attachControl(canvas, true);

    // LIGHT
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    light.intensity = 1;

    // GROUND
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
            width: 200,
            height: 200
        },
        scene
    );

    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);

    groundMat.diffuseColor = new BABYLON.Color3(0.08, 0.08, 0.08);

    ground.material = groundMat;

    // PLAYER
    const player = BABYLON.MeshBuilder.CreateBox(
        "player",
        {
            size: 2
        },
        scene
    );

    player.position.y = 1;

    const playerMat = new BABYLON.StandardMaterial("playerMat", scene);

    playerMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

    player.material = playerMat;

    // BUILDINGS
    for (let i = 0; i < 40; i++) {

        const height = Math.random() * 20 + 5;

        const building = BABYLON.MeshBuilder.CreateBox(
            "building",
            {
                width: 6,
                depth: 6,
                height: height
            },
            scene
        );

        building.position.x = Math.random() * 150 - 75;

        building.position.z = Math.random() * 150 - 75;

        building.position.y = height / 2;

        const buildingMat = new BABYLON.StandardMaterial(
            "buildingMat",
            scene
        );

        buildingMat.diffuseColor = new BABYLON.Color3(
            0.1,
            0.1,
            0.12
        );

        buildingMat.emissiveColor = new BABYLON.Color3(
            0,
            0.2,
            0.4
        );

        building.material = buildingMat;
    }

    // MOVEMENT
    const inputMap = {};

    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key] = true;
            }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key] = false;
            }
        )
    );

    scene.onBeforeRenderObservable.add(() => {

        if (inputMap["w"]) {
            player.position.z += 0.4;
        }

        if (inputMap["s"]) {
            player.position.z -= 0.4;
        }

        if (inputMap["a"]) {
            player.position.x -= 0.4;
        }

        if (inputMap["d"]) {
            player.position.x += 0.4;
        }

        // Camera follow
        camera.position.x = player.position.x;

        camera.position.z = player.position.z - 15;

        camera.position.y = player.position.y + 8;

        camera.setTarget(player.position);
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});