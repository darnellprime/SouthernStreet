const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {

    const scene = new BABYLON.Scene(engine);

    // ATMOSPHERE
    scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.03);

    // CAMERA
    const camera = new BABYLON.FreeCamera(
        "camera",
        new BABYLON.Vector3(0, 5, -15),
        scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(canvas, true);

    camera.speed = 0.6;

    // LIGHTING
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    light.intensity = 0.7;

    // STREET
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
            width: 120,
            height: 120
        },
        scene
    );

    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);

    groundMat.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.05);

    ground.material = groundMat;

    // BUILDINGS
    for (let i = 0; i < 25; i++) {

        const building = BABYLON.MeshBuilder.CreateBox(
            "building",
            {
                width: 6,
                depth: 6,
                height: Math.random() * 20 + 8
            },
            scene
        );

        building.position.x = Math.random() * 100 - 50;
        building.position.z = Math.random() * 100 - 50;

        building.position.y = building.scaling.y * 2;

        const mat = new BABYLON.StandardMaterial("mat", scene);

        mat.diffuseColor = new BABYLON.Color3(
            Math.random() * 0.2,
            Math.random() * 0.2,
            Math.random() * 0.2
        );

        mat.emissiveColor = new BABYLON.Color3(
            0,
            Math.random() * 0.3,
            Math.random() * 0.5
        );

        building.material = mat;
    }

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

    playerMat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);

    player.material = playerMat;

    // FOLLOW CAMERA EFFECT
    scene.registerBeforeRender(() => {

        camera.position.x = player.position.x;

        camera.position.z = player.position.z - 12;

        camera.position.y = player.position.y + 6;
    });

    // MOVEMENT
    const inputMap = {};

    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            evt => {
                inputMap[evt.sourceEvent.key] = true;
            }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            evt => {
                inputMap[evt.sourceEvent.key] = false;
            }
        )
    );

    scene.onBeforeRenderObservable.add(() => {

        if (inputMap["w"]) {
            player.position.z += 0.3;
        }

        if (inputMap["s"]) {
            player.position.z -= 0.3;
        }

        if (inputMap["a"]) {
            player.position.x -= 0.3;
        }

        if (inputMap["d"]) {
            player.position.x += 0.3;
        }
    });

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});