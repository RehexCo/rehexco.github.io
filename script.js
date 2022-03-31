(function () {
  // Matter aliases
  var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    Events = Matter.Events;

  var Demo = {};

  var _engine, _sceneName;

  Body.create = function (options) {
    var defaults = {
      id: Body.nextId(),
      angle: 0,
      position: { x: 0, y: 0 },
      force: { x: 0, y: 0 },
      torque: 0,
      positionImpulse: { x: 0, y: 0 },
      speed: 0,
      angularSpeed: 0,
      velocity: { x: 0, y: 0 },
      angularVelocity: 0,
      isStatic: false,
      isSleeping: false,
      motion: 1,
      sleepThreshold: 60,
      density: 0.5,
      restitution: 0.4,
      friction: 0.6,
      frictionAir: 0.8,
      path: "L 0 0 L 40 0 L 40 40 L 0 40",
      fillStyle: options.isStatic
        ? "rgba(255,255,93,0.4)"
        : Common.choose([
            "#F16764",
            "#F13064",
            "#1968e3",
            "#02B0D7",
            "#07C42E"
          ]),
      strokeStyle: "rgba(25,25,25,0.1)",
      strokeWidth: 0,
      lineWidth: 0,
      groupId: 0,
      slop: 0.5
    };

    var body = Common.extend(defaults, options);

    Body.updateProperties(body);

    return body;
  };

  Demo.init = function () {
    var container = document.getElementById("canvas-container");

    // engine options - these are the defaults
    var options = {
      positionIterations: 6,
      velocityIterations: 6,
      enableSleeping: false,
      timeScale: 0.75
    };

    // create a Matter engine, with the element to insert the canvas into
    // NOTE: this is actually Matter.Engine.create(), see the aliases at top of this file
    _engine = Engine.create(container, options);

    // run the engine
    Engine.run(_engine);

    // default scene function name
    _sceneName = "avalanche";

    // get the scene function name from hash
    if (window.location.hash.length !== 0)
      _sceneName = window.location.hash.replace("#", "");

    // set up a scene with bodies
    Demo[_sceneName]();
  };

  if (window.addEventListener) {
    window.addEventListener("load", Demo.init);
  } else if (window.attachEvent) {
    window.attachEvent("load", Demo.init);
  }

  Demo.avalanche = function () {
    var _world = _engine.world;

    //Demo.reset();
    _engine.enableSleeping = true;
    _engine.world.gravity.y = 4;

    var renderOptions = _engine.render.options;
    renderOptions.wireframes = true;
    renderOptions.background = "rbg(255,255,234)";

    var offset = 24;
    World.addBody(
      _world,
      Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, {
        isStatic: true
      })
    );
    World.addBody(
      _world,
      Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, {
        isStatic: true
      })
    );
    World.addBody(
      _world,
      Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, {
        isStatic: true
      })
    );
    World.addBody(
      _world,
      Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, {
        isStatic: true
      })
    );

    var stack = Composites.stack(
      40,
      0,
      40,
      20,
      0,
      0,
      function (x, y, column, row) {
        return Bodies.polygon(x, y, 3, 96);
      }
    );

    World.addComposite(_world, stack);

    World.addBody(
      _world,
      Bodies.rectangle(400, 300, 280, 280, { isStatic: false })
    );
  };
})();