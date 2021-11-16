import * as 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.set(-5, 10, 30);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var canvas = renderer.domElement;
document.body.appendChild(canvas);

//var controls = new THREE.OrbitControls(camera, renderer.domElement);

scene.add(new THREE.GridHelper(20, 40));
/*
var curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 15, 2 ),
	new THREE.Vector3( 20, 15, 3 ),
	new THREE.Vector3( 10, 0, 0 )
);

var points = curve.getPoints( 50 );*/
var points = [
  
];

vet0 = new THREE.Vector3( -10, 0, 10 );
vet1 = new THREE.Vector3( -5, 15, 10 );
vet2 = new THREE.Vector3( 20, 15, -5 );
vet3 = new THREE.Vector3( -10, 0, -10 );


let i = 0;
while(i <= 1) {

  var newvet = new THREE.Vector3( 0, 0, 0 );

  var cordx0 = (vet0.getComponent(0))*(Math.pow(1-i, 3));
  var cordy0 = (vet0.getComponent(1))*(Math.pow(1-i, 3));
  var cordz0 = (vet0.getComponent(2))*(Math.pow(1-i, 3));
  var newvet0 = new THREE.Vector3( cordx0, cordy0, cordz0 );

  var cordx1 = (vet1.getComponent(0))*(3*i*(Math.pow(1-i, 2)));
  var cordy1 = (vet1.getComponent(1))*(3*i*(Math.pow(1-i, 2)));
  var cordz1 = (vet1.getComponent(2))*(3*i*(Math.pow(1-i, 2)));
  var newvet1 = new THREE.Vector3( cordx1, cordy1, cordz1 );

  var cordx2 = (vet2.getComponent(0))*(3*i*i*(1-i));
  var cordy2 = (vet2.getComponent(1))*(3*i*i*(1-i));
  var cordz2 = (vet2.getComponent(2))*(3*i*i*(1-i));
  var newvet2 = new THREE.Vector3( cordx2, cordy2, cordz2 );
  
  var cordx3 = (vet3.getComponent(0))*(Math.pow(1-i, 3));
  var cordy3 = (vet3.getComponent(1))*(Math.pow(1-i, 3));
  var cordz3 = (vet3.getComponent(2))*(Math.pow(1-i, 3));
  var newvet3 = new THREE.Vector3( cordx3, cordy3, cordz3 );
  
  newvet = newvet.add(newvet0);
  newvet = newvet.add(newvet1);
  newvet = newvet.add(newvet2);
  newvet = newvet.add(newvet3);
  if (i == 0) {
    console.log(newvet0);

  }
  if (i == 1) {
    console.log(newvet);

  }
  //console.log(newvet);
  points.push(newvet);
  i = i + 0.01;
  //console.log(i);

}
//console.log(points);

var veteste1 = new THREE.Vector3( 1, 1, 1 );
var veteste2 = new THREE.Vector3( 2, 2, 2 );
veteste1 = veteste1.add(veteste2);
//console.log(veteste1);

var geometry = new THREE.BufferGeometry().setFromPoints( points );

var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
var curveObject = new THREE.Line( geometry, material );
scene.add(curveObject);
console.log(geometry);
//Criando carrinho
/*
var object_Car = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);*/
var object_Car = makeCar();
object_Car.scale.set( 0.01, 0.01, 0.01 );
scene.add(object_Car);

//imagem fundo
var imagem = 'nuvens.jpg' 
scene.background = new THREE.TextureLoader().load(imagem);

function makeCar() {
  var car = new THREE.Group();
  //add rodas
  var wheel = makeWheel();
  positions = [[-18, 18], [-18, -18], [18, 18], [18, -18]];
  for (var i = 0; i < positions.length; i++) {
    x = positions[i][0]
    y = positions[i][1]
    m = wheel.clone()
    m.position.x = x
    m.position.y = y
    car.add(m)
  }
  //add parte principal
  var main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  main.position.z = 12;
  car.add(main);
  // add cabine
  var cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 24, 12),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  );
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  car.add(cabin);
  return car;
}

//criando rodas
function makeWheel() {
  const geometry = new THREE.CylinderGeometry(6, 6, 5, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  var wheel = new THREE.Mesh(geometry, material);
  wheel.position.z = 6;
  return wheel;
}

var carPositionOnSpline = 0;

function update_Car() {
  object_Car.position.x = points[Math.trunc(time) % 100].getComponent(0);
  object_Car.position.y = points[Math.trunc(time) % 100].getComponent(1);
  object_Car.position.z = points[Math.trunc(time) % 100].getComponent(2);

  var next_point = new THREE.Vector3(points[(Math.trunc(time) % 100)+1].getComponent(0), points[(Math.trunc(time) % 100)+1].getComponent(1), points[(Math.trunc(time) % 100)+1].getComponent(2)); 
  object_Car.rotation.x = Math.PI / 2;
  console.log(next_point);
  console.log("testeeee");
  console.log(object_Car.position);
  object_Car.lookAt( next_point );

  if (camera_no_carrinho == 1) {
    camera.position.set(object_Car.position.x, object_Car.position.y, object_Car.position.z);
    camera.lookAt(next_point.getComponent(0), next_point.getComponent(1), next_point.getComponent(2));
    camera.updateProjectionMatrix();

  }
  //camera.position.set(object_Car.position.x, object_Car.position.y, object_Car.position.z);
  //camera.lookAt(next_point.getComponent(0), next_point.getComponent(1), next_point.getComponent(2));
  
  
}
 



// Ball
/*
const geo = new THREE.SphereGeometry(0.5, 20, 32); // (radius, widthSegments, heightSegments)
const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const sphere = new THREE.Mesh(geo, material2);
scene.add(sphere);
*/



var clock = new THREE.Clock();
var time = 0;
//Carrinho
var speed = 5;

function update_ball() {
  sphere.position.x = points[Math.trunc(speed*time) % 100].getComponent(0);
  sphere.position.y = points[Math.trunc(speed*time) % 100].getComponent(1);
  sphere.position.z = points[Math.trunc(speed*time) % 100].getComponent(2);
}


//mudança camera 
var camera_no_carrinho = 0;
window.addEventListener("keydown", function (event) {
  if (event.key == "c") {
    camera_no_carrinho = 1;
                
    return;
  }
  
});

function mudar_camera() {
  camera.position.set(object_Car.position);
  camera.lookAt(new THREE.Vector3(points[(Math.trunc(time) % 100)+1].getComponent(0), points[(Math.trunc(time) % 100)+1].getComponent(1), points[(Math.trunc(time) % 100)+1].getComponent(2)));
  //camera.updateProjectionMatrix();
}


render();

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = window.innerWidth/2;
  const height = window.innerHeight/1.5;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}



function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  /*
  if (camera_no_carrinho == 1) {
    mudar_camera();
  }*/
  renderer.render(scene, camera);

  time += clock.getDelta();
  //console.log(time);
  //update_ball();
  update_Car();

  //curve.points[1].y = Math.sin(time) * 2.5;

  //geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

  //curveObject.geometry.dispose();
  //curveObject.geometry = geometry;


  requestAnimationFrame(render);
}