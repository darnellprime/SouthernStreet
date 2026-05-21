const canvas = document.getElementById("gameCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {

    const scene = new BABYLON.Scene(engine);

    // CINEMATIC SUNSET ATMOSPHERE
    scene.clearColor = new BABYLON.Color4(
        0.75,
        0.42,
        0.15,
        1
    );

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

    scene.fogDensity = 0.006;

    scene.fogColor = new BABYLON.Color3(
        0.75,
        0.42,
        0.15
    );

    // CAMERA
    const camera = new BABYLON.UniversalCamera(
        "camera",
        new BABYLON.Vector3(0, 6, -14),
        scene
    );

    camera.fov = 1.2;

    // SUNSET LIGHTING
    const sun = new BABYLON.DirectionalLight(
        "sun",
        new BABYLON.Vector3(-1, -2, 1),
        scene
    );

    sun.position = new BABYLON.Vector3(
        40,
        60,
        -40
    );

    sun.intensity = 2.8;

    sun.diffuse = new BABYLON.Color3(
        1,
        0.5,
        0.2
    );

    // AMBIENT LIGHT
    const ambient = new BABYLON.HemisphericLight(
        "ambient",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    ambient.intensity = 0.35;

    // STREET
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
            width: 500,
            height: 500
        },
        scene
    );

    const groundMat =
        new BABYLON.StandardMaterial(
            "groundMat",
            scene
        );

    groundMat.diffuseColor =
        new BABYLON.Color3(
            0.08,
            0.05,
            0.04
        );

    groundMat.specularColor =
        new BABYLON.Color3(
            1,
            0.5,
            0.2
        );

    ground.material = groundMat;

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

    const roadMat =
        new BABYLON.StandardMaterial(
            "roadMat",
            scene
        );

    roadMat.diffuseColor =
        new BABYLON.Color3(
            0.03,
            0.03,
            0.03
        );

    road.material = roadMat;

    // BUILDINGS
    for (let i = 0; i < 160; i++) {

        const width =
            Math.random() * 10 + 5;

        const depth =
            Math.random() * 10 + 5;

        const height =
            Math.random() * 60 + 8;

        const building =
            BABYLON.MeshBuilder.CreateBox(
                "building",
                {
                    width,
                    depth,
                    height
                },
                scene
            );

        const side =
            Math.random() > 0.5 ? 1 : -1;

        building.position.x =
            side * (Math.random() * 90 + 20);

        building.position.z =
            Math.random() * 450 - 225;

        building.position.y =
            height / 2;

        const mat =
            new BABYLON.StandardMaterial(
                "mat",
                scene
            );

        mat.diffuseColor =
            new BABYLON.Color3(
                0.12,
                0.08,
                0.06
            );

        mat.emissiveColor =
            new BABYLON.Color3(
                0.25,
                0.1,
                0.04
            );

        building.material = mat;
    }

    // STREETLIGHTS
    for (let i = -220; i < 220; i += 18) {

        const light =
            new BABYLON.PointLight(
                "street",
                new BABYLON.Vector3(
                    -11,
                    8,
                    i
                ),
                scene
            );

        light.intensity = 8;

        light.diffuse =
            new BABYLON.Color3(
                1,
                0.65,
                0.3
            );
    }

    // PLAYER
    const player =
        BABYLON.MeshBuilder.CreateBox(
            "player",
            {
                width: 1,
                depth: 1,
                height: 2
            },
            scene
        );

    player.position.y = 1;

    const playerMat =
        new BABYLON.StandardMaterial(
            "playerMat",
            scene
        );

    playerMat.diffuseColor =
        new BABYLON.Color3(
            0.05,
            0.05,
            0.05
        );

    player.material = playerMat;

    // CONTROLS
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

        const speed = 0.42;

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

        // SMOOTH CAMERA
        camera.position.x +=
            (player.position.x - camera.position.x)
            * 0.05;

        camera.position.y +=
            ((player.position.y + 5)
            - camera.position.y)
            * 0.05;

        camera.position.z +=
            ((player.position.z - 12)
            - camera.position.z)
            * 0.05;

        camera.setTarget(
            new BABYLON.Vector3(
                player.position.x,
                player.position.y + 1,
                player.position.z
            )
        );
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