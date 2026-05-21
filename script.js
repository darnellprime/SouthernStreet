const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {

    const scene = new BABYLON.Scene(engine);

    // ATMOSPHERE
    scene.clearColor = new BABYLON.Color4(0.01, 0.01, 0.02, 1);

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

    scene.fogDensity = 0.015;

    scene.fogColor = new BABYLON.Color3(0.02, 0.02, 0.03);

    // CAMERA
    const camera = new BABYLON.UniversalCamera(
        "camera",
        new BABYLON.Vector3(0, 8, -18),
        scene
    );

    camera.attachControl(canvas, true);

    camera.fov = 1.1;

    // LIGHTING
    const hemiLight = new BABYLON.HemisphericLight(
        "hemi",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    hemiLight.intensity = 0.5;

    const neonLight = new BABYLON.PointLight(
        "neon",
        new BABYLON.Vector3(0, 15, 0),
        scene
    );

    neonLight.diffuse = new BABYLON.Color3(0, 0.6, 1);

    neonLight.intensity = 15;

    // GROUND
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
            width: 300,
            height: 300
        },
        scene
    );

    const groundMat = new BABYLON.StandardMaterial(
        "groundMat",
        scene
    );

    groundMat.diffuseColor = new BABYLON.Color3(
        0.05,
        0.05,
        0.05
    );

    groundMat.specularColor = new BABYLON.Color3(
        0.2,
        0.2,
        0.2
    );

    ground.material = groundMat;

    // ROADS
    for (let i = -100; i <= 100; i += 40) {

        const road = BABYLON.MeshBuilder.CreateBox(
            "road",
            {
                width: 12,
                depth: 300,
                height: 0.1
            },
            scene
        );

        road.position.x = i;

        const roadMat = new BABYLON.StandardMaterial(
            "roadMat",
            scene
        );

        roadMat.diffuseColor = new BABYLON.Color3(
            0.02,
            0.02,
            0.02
        );

        road.material = roadMat;
    }

    // BUILDINGS
    for (let i = 0; i < 80; i++) {

        const height = Math.random() * 35 + 10;

        const building = BABYLON.MeshBuilder.CreateBox(
            "building",
            {
                width: Math.random() * 8 + 6,
                depth: Math.random() * 8 + 6,
                height: height
            },
            scene
        );

        building.position.x = Math.random() * 250 - 125;

        building.position.z = Math.random() * 250 - 125;

        building.position.y = height / 2;

        const mat = new BABYLON.StandardMaterial(
            "mat",
            scene
        );

        mat.diffuseColor = new BABYLON.Color3(
            0.08,
            0.08,
            0.1
        );

        // Window glow effect
        mat.emissiveColor = new BABYLON.Color3(
            Math.random() * 0.05,
            Math.random() * 0.3,
            Math.random() * 0.5
        );

        building.material = mat;
    }

    // STREETLIGHTS
    for (let i = -100; i <= 100; i += 25) {

        const pole = BABYLON.MeshBuilder.CreateCylinder(
            "pole",
            {
                height: 10,
                diameter: 0.3
            },
            scene
        );

        pole.position = new BABYLON.Vector3(i, 5, 10);

        const lightOrb = BABYLON.MeshBuilder.CreateSphere(
            "lightOrb",
            {
                diameter: 0.8
            },
            scene
        );

        lightOrb.position = new BABYLON.Vector3(i, 10, 10);

        const orbMat = new BABYLON.StandardMaterial(
            "orbMat",
            scene
        );

        orbMat.emissiveColor = new BABYLON.Color3(
            1,
            0.8,
            0.4
        );

        lightOrb.material = orbMat;

        const pointLight = new BABYLON.PointLight(
            "streetLight",
            new BABYLON.Vector3(i, 10, 10),
            scene
        );

        pointLight.intensity = 6;
    }

    // PLAYER
    const player = BABYLON.MeshBuilder.CreateBox(
        "player",
        {
            height: 2,
            width: 1,
            depth: 1
        },
        scene
    );

    player.position.y = 1;

    const playerMat = new BABYLON.StandardMaterial(
        "playerMat",
        scene
    );

    playerMat.diffuseColor = new BABYLON.Color3(
        0.8,
        0.1,
        0.1
    );

    player.material = playerMat;

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

        const speed = 0.45;

        if (inputMap["w"]) {
            player.position.z += speed;
        }

        if (inputMap["s"]) {
            player.position.z -= speed;
        }

        if (inputMap["a"]) {
            player.position.x -= speed;
        }

        if (inputMap["d"]) {
            player.position.x += speed;
        }

        // Smooth cinematic camera
        camera.position.x +=
            (player.position.x - camera.position.x) * 0.08;

        camera.position.z +=
            ((player.position.z - 18) - camera.position.z) * 0.08;

        camera.position.y +=
            ((player.position.y + 8) - camera.position.y) * 0.08;

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