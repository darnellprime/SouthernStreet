const canvas = document.getElementById("gameCanvas");

const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {

    const scene = new BABYLON.Scene(engine);

    // ATMOSPHERE
    scene.clearColor = new BABYLON.Color4(
        0.75,
        0.45,
        0.2,
        1
    );

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;

    scene.fogDensity = 0.004;

    scene.fogColor = new BABYLON.Color3(
        0.75,
        0.45,
        0.2
    );

    // CAMERA
    const camera = new BABYLON.UniversalCamera(
        "camera",
        new BABYLON.Vector3(0, 7, -14),
        scene
    );

    camera.fov = 1.1;

    // LIGHTING
    const sun = new BABYLON.DirectionalLight(
        "sun",
        new BABYLON.Vector3(-1, -2, 1),
        scene
    );

    sun.intensity = 3;

    sun.diffuse = new BABYLON.Color3(
        1,
        0.55,
        0.2
    );

    const ambient = new BABYLON.HemisphericLight(
        "ambient",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    ambient.intensity = 0.45;

    // STREET
    const street = BABYLON.MeshBuilder.CreateGround(
        "street",
        {
            width: 200,
            height: 400
        },
        scene
    );

    const streetMat = new BABYLON.StandardMaterial(
        "streetMat",
        scene
    );

    streetMat.diffuseColor = new BABYLON.Color3(
        0.04,
        0.04,
        0.04
    );

    streetMat.specularColor = new BABYLON.Color3(
        1,
        0.6,
        0.3
    );

    street.material = streetMat;

    // ROAD
    const road = BABYLON.MeshBuilder.CreateBox(
        "road",
        {
            width: 26,
            depth: 400,
            height: 0.1
        },
        scene
    );

    road.position.y = 0.05;

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

    // SIDEWALKS
    const sidewalkLeft = BABYLON.MeshBuilder.CreateBox(
        "sidewalkLeft",
        {
            width: 12,
            depth: 400,
            height: 0.4
        },
        scene
    );

    sidewalkLeft.position.x = -19;

    sidewalkLeft.position.y = 0.2;

    const sidewalkRight = sidewalkLeft.clone(
        "sidewalkRight"
    );

    sidewalkRight.position.x = 19;

    const sidewalkMat =
        new BABYLON.StandardMaterial(
            "sidewalkMat",
            scene
        );

    sidewalkMat.diffuseColor =
        new BABYLON.Color3(
            0.15,
            0.15,
            0.15
        );

    sidewalkLeft.material = sidewalkMat;

    sidewalkRight.material = sidewalkMat;

    // BUILDINGS
    for (let i = 0; i < 50; i++) {

        const building =
            BABYLON.MeshBuilder.CreateBox(
                "building",
                {
                    width: Math.random() * 8 + 8,
                    depth: Math.random() * 8 + 8,
                    height: Math.random() * 25 + 12
                },
                scene
            );

        const side =
            Math.random() > 0.5 ? 1 : -1;

        building.position.x =
            side * (Math.random() * 35 + 25);

        building.position.z =
            Math.random() * 350 - 175;

        building.position.y =
            building.scaling.y * 2;

        const buildMat =
            new BABYLON.StandardMaterial(
                "buildMat",
                scene
            );

        buildMat.diffuseColor =
            new BABYLON.Color3(
                0.12,
                0.08,
                0.06
            );

        buildMat.emissiveColor =
            new BABYLON.Color3(
                0.2,
                0.08,
                0.03
            );

        building.material = buildMat;
    }

    // STREETLIGHTS
    for (let i = -180; i < 180; i += 20) {

        const light =
            new BABYLON.PointLight(
                "light",
                new BABYLON.Vector3(
                    -10,
                    8,
                    i
                ),
                scene
            );

        light.intensity = 7;

        light.diffuse =
            new BABYLON.Color3(
                1,
                0.7,
                0.4
            );
    }

    // PARKED CARS
    for (let i = -150; i < 150; i += 40) {

        const car =
            BABYLON.MeshBuilder.CreateBox(
                "car",
                {
                    width: 3,
                    height: 1.4,
                    depth: 6
                },
                scene
            );

        car.position = new BABYLON.Vector3(
            8,
            0.7,
            i
        );

        const carMat =
            new BABYLON.StandardMaterial(
                "carMat",
                scene
            );

        carMat.diffuseColor =
            new BABYLON.Color3(
                0.05,
                0.05,
                0.05
            );

        car.material = carMat;
    }

    // PLAYER
    const player =
        BABYLON.MeshBuilder.CreateCapsule(
            "player",
            {
                height: 2,
                radius: 0.5
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
            0.08,
            0.08,
            0.08
        );

    player.material = playerMat;

    // NPC
    const npc =
        BABYLON.MeshBuilder.CreateCapsule(
            "npc",
            {
                height: 2,
                radius: 0.5
            },
            scene
        );

    npc.position = new BABYLON.Vector3(
        -12,
        1,
        20
    );

    const npcMat =
        new BABYLON.StandardMaterial(
            "npcMat",
            scene
        );

    npcMat.diffuseColor =
        new BABYLON.Color3(
            0.2,
            0.2,
            0.25
        );

    npc.material = npcMat;

    // STORE OBJECTIVE
    const marker =
        BABYLON.MeshBuilder.CreateCylinder(
            "marker",
            {
                height: 0.2,
                diameter: 3
            },
            scene
        );

    marker.position = new BABYLON.Vector3(
        -18,
        0.2,
        60
    );

    const markerMat =
        new BABYLON.StandardMaterial(
            "markerMat",
            scene
        );

    markerMat.emissiveColor =
        new BABYLON.Color3(
            1,
            0.2,
            0.2
        );

    marker.material = markerMat;

    // INPUT
    const input = {};

    scene.actionManager =
        new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            evt => {
                input[evt.sourceEvent.key] = true;
            }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            evt => {
                input[evt.sourceEvent.key] = false;
            }
        )
    );

    // LOOP
    scene.onBeforeRenderObservable.add(() => {

        const speed = 0.3;

        if (input["w"]) player.position.z += speed;

        if (input["s"]) player.position.z -= speed;

        if (input["a"]) player.position.x -= speed;

        if (input["d"]) player.position.x += speed;

        // CAMERA FOLLOW
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

        // OBJECTIVE COMPLETE
        const distance =
            BABYLON.Vector3.Distance(
                player.position,
                marker.position
            );

        if (distance < 3) {

            document.getElementById(
                "objective"
            ).innerText =
                "OBJECTIVE COMPLETE";
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