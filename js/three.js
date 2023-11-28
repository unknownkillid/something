const scene = new THREE.Scene();
let countIsOpened = false;
const header = document.getElementById('header')

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = -12;
camera.position.x = -10;
camera.position.y = 1.5;
// camera.position.z = 18;
// camera.position.x = 18;
// camera.position.y = 18;
camera.rotation.y = 0;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

let isDragging = false;
let previousMouseX = 0;
let rotationSpeed = 0;
const inertiaDelay = 600;
let inertiaTimeout;
let isMouseEventsEnabled = true;

function onMouseDown(event) {
  if (!isMouseEventsEnabled) return;
  isDragging = true;
  previousMouseX = event.clientX;
  rotationSpeed = 0;
  clearTimeout(inertiaTimeout);
}

function onMouseMove(event) {
  if (!isMouseEventsEnabled) return;

  if (isDragging) {
    const currentMouseX = event.clientX;
    const deltaX = currentMouseX - previousMouseX;
    previousMouseX = currentMouseX;
    rotationSpeed = deltaX * 0.001;
  }
}

function onMouseUp() {
  if (!isMouseEventsEnabled) return;

  isDragging = false;
  clearTimeout(inertiaTimeout);
  inertiaTimeout = setTimeout(() => {
    rotationSpeed = 0;
  }, inertiaDelay);
}

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

handleResize();
window.addEventListener("resize", handleResize);

const loader = new THREE.GLTFLoader();
loader.load(
  'assets/garage/scene.gltf',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const rickLoader = new THREE.GLTFLoader();
let rickModel;
let secondModel;
let thirdModel;
let fourthModel;

rickLoader.load(
  'assets/hand/scene.gltf',
  function (gltf2) {
    rickModel = gltf2.scene;
    rickModel.position.set(-9.8, 0.5, -9.8);
    rickModel.rotation.z = 0;
    rickModel.rotation.y = -0.2;
    rickModel.rotation.x = 0;
    rickModel.scale.set(0.1, 0.1, 0.1)
    scene.add(rickModel);

    const mixer = new THREE.AnimationMixer(rickModel);

    // // Play only the first animation
    // if (gltf2.animations.length > 0) {
    //   const firstAnimation = gltf2.animations[0];
    //   const action = mixer.clipAction(firstAnimation);
    //   action.setLoop(THREE.LoopRepeat);
    //   action.clampWhenFinished = true;
    //   action.play();
    // }

    rickModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });

    // function animate() {
    //   requestAnimationFrame(animate);
    //   mixer.update(0.004);
    //   renderer.render(scene, camera);
    // }
    // animate();

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


const secondModelLoader = new THREE.GLTFLoader();
secondModelLoader.load(
  'assets/tech/model/scene.gltf',
  function (gltf) {
    secondModel = gltf.scene;
    secondModel.position.set(-8, 0, -9.7);
    secondModel.rotation.z = 0;
    secondModel.rotation.y = -1.6;
    secondModel.scale.set(0.50, 0.50, 0.50)
    scene.add(secondModel);

    const mixer = new THREE.AnimationMixer(secondModel);
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat);
      action.clampWhenFinished = true;
      action.play();
    });

    secondModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });


    function animate() {
      requestAnimationFrame(animate);
      mixer.update(0.006);
      renderer.render(scene, camera);
    }
    animate();

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const thirdModelLoader = new THREE.GLTFLoader();
thirdModelLoader.load(
  'assets/sea/scene.gltf',
  function (gltf) {
    thirdModel = gltf.scene;
    thirdModel.position.set(-8.8, 0.6, -10.1);
    thirdModel.scale.set(0.2, 0.2, 0.2)
    thirdModel.rotation.y = 4;
    scene.add(thirdModel);

    thirdModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });

    const loading = document.getElementById('loading')
    loading.classList.add('loadingDone')
    setTimeout(() => {
      loading.style.display = 'none'
    }, 700);

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const fourthModelLoader = new THREE.GLTFLoader();
fourthModelLoader.load(
  'assets/alien/scene.gltf',
  function (gltf) {
    fourthModel = gltf.scene;
    fourthModel.position.set(-11, 0, -10);
    fourthModel.rotation.y = 1.5;
    fourthModel.scale.set(0.014, 0.01, 0.01)
    scene.add(fourthModel);

    const mixer = new THREE.AnimationMixer(fourthModel);

    
    // Play only the first animation
    if (gltf.animations.length > 0) {
      const firstAnimation = gltf.animations[0];
      const action = mixer.clipAction(firstAnimation);
      action.setLoop(THREE.LoopRepeat);
      action.clampWhenFinished = true;
      action.play();
    }

    fourthModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });

     function animate() {
      requestAnimationFrame(animate);
      mixer.update(0.004);
      renderer.render(scene, camera);
    }
    animate();

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function onHover(event) {
  event.preventDefault();

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  if (rickModel) {
    const intersectsRick = raycaster.intersectObject(rickModel, true);

    rickModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 1;
        child.material.transparent = true;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsRick.length > 0) {
      rickModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.5;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  if (secondModel) {
    const intersectsSecond = raycaster.intersectObject(secondModel, true);

    secondModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 1;
        child.material.transparent = true;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsSecond.length > 0) {
      secondModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.8;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  if (thirdModel) {
    const intersectsThird = raycaster.intersectObject(thirdModel, true);

    thirdModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 1;
        child.material.transparent = false;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsThird.length > 0) {
      thirdModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.5;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  if (fourthModel) {
    const intersectsFourth = raycaster.intersectObject(fourthModel, true);

    fourthModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 1;
        child.material.transparent = true;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsFourth.length > 0) {
      fourthModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.5;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }
}

let flag = 1;


function onClick(event) {
  event.preventDefault();

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  if (rickModel) {
    const intersectsRick = raycaster.intersectObject(rickModel, true);

    if (intersectsRick.length > 0) {
      header.classList.add('headerTransition')
      const aboutSound = new Audio();
      aboutSound.src = 'assets/sounds/AI Sounds/OpeningAbout.mp3'
      aboutSound.play();
      isMouseEventsEnabled = false;
      const about = document.getElementById('aboutMeSection');
      setTimeout(() => {
        about.classList.add('aboutZoom');
      }, 500);

      about.style.display = 'flex';

      new TWEEN.Tween(camera.position)
        .to({ x: -1.2, y: 1.7, z: 1 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 0.5, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();


    }
  }

  if (secondModel) {
    const intersectsSecond = raycaster.intersectObject(secondModel, true);

    if (intersectsSecond.length > 0) {
      header.classList.add('headerTransition')
      const techOpen = new Audio();
      techOpen.src = 'assets/sounds/AI Sounds/openingTech.mp3'
      techOpen.play();
      isMouseEventsEnabled = false;
      const tech = document.getElementById('techSection');
      setTimeout(() => {
        tech.classList.add('techopen');
      }, 500);

      tech.style.display = 'flex';

      new TWEEN.Tween(camera.position)
        .to({ x: -2.5, y: 1.2, z: 3 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 2, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }
  }
  const projectAlert = document.getElementById('projectsAlert');


  if (thirdModel) {
    const intersectsThird = raycaster.intersectObject(thirdModel, true);

    if (intersectsThird.length > 0) {
      header.classList.add('headerTransition')
      const projectsOpening = new Audio();
      projectsOpening.src = 'assets/sounds/AI Sounds/openingProjects.mp3'
      projectsOpening.play();
      isMouseEventsEnabled = false;
      openedCheck();

      function ifopened() {
        if (!countIsOpened) {
          setTimeout(() => {
            projectAlert.classList.add('projectsWarningOpen');
          }, 1000);
          setTimeout(() => {
            countdown(5);
          }, 500);
          countIsOpened = true;
        }
        requestAnimationFrame(ifopened)
      }

      ifopened();

      new TWEEN.Tween(camera.position)
        .to({ x: 0.7, y: 1.5, z: 1.4 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 0.2, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }
  }

  function countdown(seconds) {
    var countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = seconds + "...";

    if (seconds >= 0) {
      setTimeout(function () {
        countdown(seconds - 1);
      }, 1000);
    } else {
      countdownElement.innerHTML = "Opening Projects!";
      setTimeout(() => {
        projectAlert.classList.remove('projectsWarningOpen')
        const projects = document.getElementById('projects')
        projects.style.display = 'flex'
        setTimeout(() => {
          projects.classList.add('projectsComein')
        }, 100);
      }, 600);
    }
  }

  document.getElementById('xBtnProjects').addEventListener('click', () => {
    document.getElementById('projects').classList.remove('projectsComein')
  })

  function openedCheck() {
    if (countIsOpened) {
      setTimeout(() => {
        projects.classList.add('projectsComein')
      }, 100);
    }
  }


  if (fourthModel) {
    const intersectsFourth = raycaster.intersectObject(fourthModel, true);

    if (intersectsFourth.length > 0) {
      header.classList.add('headerTransition')
      const contactOpening = new Audio();
      contactOpening.src = 'assets/sounds/AI Sounds/openingContacts.mp3'
      contactOpening.play();
      isMouseEventsEnabled = false;
      const contact = document.getElementById('contactMain');
      setTimeout(() => {
        contact.classList.add('contactComeIn');
      }, 500);

      contact.style.display = 'flex'

      new TWEEN.Tween(camera.position)
        .to({ x: 0.8, y: 1.2, z: 4.5 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 3, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }
  }
}



const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xfffffff, 2)
scene.add(directionalLight)
directionalLight.position.x = -1;

document.querySelectorAll('.XBtn').forEach(buttons => {
  buttons.addEventListener('click', () => {
    cameraDefaultPositionTween()
    isMouseEventsEnabled = true
    header.classList.remove('headerTransition')
  })
})

function cameraDefaultPositionTween() {
  new TWEEN.Tween(camera.position)
    .to({ x: -10, y: 1.5, z: -12 }, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();

  new TWEEN.Tween(camera.rotation)
    .to({ y: Math.PI / 2, z: 0 }, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
}


document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);


const rangeInput = document.getElementById('rangeMusic');

rangeInput.addEventListener('mousedown', function () {
  const value = rangeInput.value;
  isMouseEventsEnabled = false;
});
rangeInput.addEventListener('mouseup', function () {
  const value = rangeInput.value;
  isMouseEventsEnabled = true;
});

document.addEventListener("touchstart", onTouchStart);
document.addEventListener("touchmove", onTouchMove);
document.addEventListener("touchend", onTouchEnd);
let previousTouchX = 0;
let isTouchEventsEnabled = true;


function onTouchStart(event) {
  if (!isTouchEventsEnabled) return;
  isDragging = true;
  previousTouchX = event.touches[0].clientX;
  rotationSpeed = 0;
  clearTimeout(inertiaTimeout);
}

function onTouchMove(event) {
  if (!isTouchEventsEnabled) return;

  if (isDragging) {
    const currentTouchX = event.touches[0].clientX;
    const deltaX = currentTouchX - previousTouchX;
    previousTouchX = currentTouchX;
    rotationSpeed = deltaX * 0.001;
  }
}

function onTouchEnd() {
  if (!isTouchEventsEnabled) return;

  isDragging = false;
  clearTimeout(inertiaTimeout);
  inertiaTimeout = setTimeout(() => {
    rotationSpeed = 0;
  }, inertiaDelay);
}

// var controls = new THREE.OrbitControls(camera, renderer.domElement);

var video = document.getElementById('video');

// Create a texture
var videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.NearestFilter;
videoTexture.magFilter = THREE.NearestFilter;
videoTexture.format = THREE.RGBAFormat;

var material = new THREE.MeshBasicMaterial({ map: videoTexture });
var geometry = new THREE.PlaneGeometry(7, 2);
var tvScreen = new THREE.Mesh(geometry, material);

tvScreen.position.set(-9.915, 1.433, -12.471);
tvScreen.scale.set(0.0875, 0.172, 0.5);

scene.add(tvScreen);

function animate() {
  requestAnimationFrame(animate);

  camera.rotation.y += rotationSpeed;
  renderer.render(scene, camera);
  TWEEN.update();

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    videoTexture.needsUpdate = true;
  }
}

animate();