var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.set(8, 13, 25);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var canvas = renderer.domElement;
document.body.appendChild(canvas);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

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
vet3 = new THREE.Vector3( 10, 10, 0 );


let i = 0.00;
while(i < 1) {

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
  var cordy2= (vet2.getComponent(1))*(3*i*i*(1-i));
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

// Ball
const geo = new THREE.SphereGeometry(0.5, 20, 32); // (radius, widthSegments, heightSegments)
const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const sphere = new THREE.Mesh(geo, material2);
scene.add(sphere);




var clock = new THREE.Clock();
var time = 0;
//Carrinho


function update_ball() {
  sphere.position.x = points[Math.trunc(time)].getComponent(0);
  sphere.position.y = points[Math.trunc(time)].getComponent(1);
  sphere.position.z = points[Math.trunc(time)].getComponent(2);
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
  renderer.render(scene, camera);

  time += clock.getDelta();
  console.log(time);
  update_ball();

  //curve.points[1].y = Math.sin(time) * 2.5;

  //geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

  //curveObject.geometry.dispose();
  //curveObject.geometry = geometry;


  requestAnimationFrame(render);
}