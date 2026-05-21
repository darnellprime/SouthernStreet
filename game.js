const canvas = document.getElementById("gameCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {

    const scene = new BABYLON.Scene(engine);

    // ATMOSPHERE
    scene.clearColor = new BABYLON.Color4(
        0.005,
        0.005,
        0.01,
        1
    );

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

    scene.fogDensity = 0.02;

    scene.fogColor = new BABYLON.Color3(
        0.02,
        0.02,
        0.03
    );

    // CAMERA
    const camera = new BABYLON.UniversalCamera(
        "camera",
        new BABYLON.Vector3(0, 7, -14),
        scene
    );

    camera.fov = 1.1;

    // LIGHTING
    const moonLight = new BABYLON.HemisphericLight(
        "moonLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    moonLight.intensity = 0.35;

    // PLAYER
    const player = BABYLON.MeshBuilder.CreateBox(
        "player",
        {
            width: 1,
            depth: 1,
            height: 2
        },
        scene
    );

    player.position.y = 1;

    const playerMaterial = new BABYLON.StandardMaterial(
        "playerMaterial",
        scene
    );

    playerMaterial.diffuseColor = new BABYLON.Color3(
        0.85,
        0.1,
        0.1
    );

    playerMaterial.emissiveColor = new BABYLON.Color3(
        0.15,
        0,
        0
    );

    player.material = playerMaterial;

    // CITY GROUND
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
            width: 500,
            height: 500
        },
        scene
    );

    const groundMaterial = new BABYLON.StandardMaterial(
        "groundMaterial",
        scene
    );

    groundMaterial.diffuseColor = new BABYLON.Color3(
        0.03,
        0.03,
        0.04
    );

    groundMaterial.specularColor = new BABYLON.Color3(
        0.4,
        0.4,
        0.4
    );

    ground.material = groundMaterial;

    // MAIN ROAD
    const road = BABYLON.MeshBuilder.CreateBox(
        "road",
        {
            width: 24,
            depth: 500,
            height: 0.1
        },
        scene
    );

    road.position.y = 0.05;

    const roadMaterial = new BABYLON.StandardMaterial(
        "roadMaterial",
        scene
    );

    roadMaterial.diffuseColor = new BABYLON.Color3(
        0.01,
        0.01,
        0.01
    );

    road.material = roadMaterial;

    // BUILDINGS
    for (let i = 0; i < 120; i++) {

        const size = Math.random() * 8 + 5;

        const height = Math.random() * 40 + 8;

        const building = BABYLON.MeshBuilder.CreateBox(
            "building",
            {
                width: size,
                depth: size,
                height: height
            },
            scene
        );

        const side = Math.random() > 0.5 ? 1 : -1;

        building.position.x =
            side * (Math.random() * 80 + 18);

        building.position.z =
            Math.random() * 450 - 225;

        building.position.y = height / 2;

        const buildingMaterial =
            new BABYLON.StandardMaterial(
                "buildingMaterial",
                scene
            );

        buildingMaterial.diffuseColor =
            new BABYLON.Color3(
                0.05,
                0.05,
                0.07
            );

        buildingMaterial.emissiveColor =
            new BABYLON.Color3(
                0,
                Math.random() * 0.15,
                Math.random() * 0.3
            );

        building.material = buildingMaterial;
    }

    // STREET LIGHTS
    for (let i = -200; i < 200; i += 20) {

        const pole = BABYLON.MeshBuilder.CreateCylinder(
            "pole",
            {
                height: 9,
                diameter: 0.25
            },
            scene
        );

        pole.position = new BABYLON.Vector3(
            -10,
            4.5,
            i
        );

        const lightSphere =
            BABYLON.MeshBuilder.CreateSphere(
                "lightSphere",
                {
                    diameter: 0.6
                },
                scene
            );

        lightSphere.position = new BABYLON.Vector3(
            -10,
            9,
            i
        );

        const bulbMaterial =
            new BABYLON.StandardMaterial(
                "bulbMaterial",
                scene
            );

        bulbMaterial.emissiveColor =
            new BABYLON.Color3(
                1,
                0.8,
                0.5
            );

        lightSphere.material = bulbMaterial;

        const pointLight =
            new BABYLON.PointLight(
                "pointLight",
                new BABYLON.Vector3(
                    -10,
                    9,
                    i
                ),
                scene
            );

        pointLight.intensity = 4;
    }

    // INPUT
    const input = {};

    scene.actionManager =
        new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            (evt) => {
                input[evt.sourceEvent.key] = true;
            }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            (evt) => {
                input[evt.sourceEvent.key] = false;
            }
        )
    );

    // GAME LOOP
    scene.onBeforeRenderObservable.add(() => {

        const speed = 0.35;

        if (input["w"]) {
            player.position.z += speed;
        }

        if (input["s"]) {
            player.position.z -= speed;
        }

        if (input["a"]) {
            player.position.x -= speed;
        }

        if (input["d"]) {
            player.position.x += speed;
        }

        // CAMERA FOLLOW
        camera.position.x +=
            (player.position.x - camera.position.x) * 0.08;

        camera.position.y +=
            ((player.position.y + 6)
            - camera.position.y) * 0.08;

        camera.position.z +=
            ((player.position.z - 14)
            - camera.position.z) * 0.08;

        camera.setTarget(player.position);
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