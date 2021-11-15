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

const c1 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( 0, 5, 15 ),
	new THREE.Vector3( 0, 5, 5 ),
	new THREE.Vector3( 0, 20, 5 ),
	new THREE.Vector3( 0, 20, 0 )
);

//points.add(curve1.getPoint(100));
var p1 = c1.getPoints(100);
console.log(p1);

const c2 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( 0, 20, 0 ),
	new THREE.Vector3( 0, 20, -5 ),
	new THREE.Vector3( 0, 7.5, -5 ),
	new THREE.Vector3( 0, 7.5, -10)
);
const p2 = c2.getPoints(100);
var points = p1.concat(p2);

const c3 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( 0, 7.5, -10 ),
	new THREE.Vector3( 0, 7.5, -12.5 ),
	new THREE.Vector3( 0, 11, -12.5 ),
	new THREE.Vector3( 0, 11, -15)
);
const p3 = c3.getPoints(100);
var points = points.concat(p3);

const c4 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( 0, 11, -15),
	new THREE.Vector3( 0, 11, -17.5),
	new THREE.Vector3( 0, 7.5, -17.5 ),
	new THREE.Vector3( 0, 7.5, -20)
);
const p4 = c4.getPoints(100);
var points = points.concat(p4);

const c5 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( 0, 7.5, -20),
	new THREE.Vector3( 0, 7.5, -22.5),
	new THREE.Vector3( 0, 10, -25 ),
	new THREE.Vector3( -3, 12.5, -27.5)
);
const p5 = c5.getPoints(100);
var points = points.concat(p5);

const c6 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -3, 12.5, -27.5),
	new THREE.Vector3( -6, 15, -30),
	new THREE.Vector3( -16, 15, -30 ),
	new THREE.Vector3( -19, 12.5, -27.5)
);
const p6 = c6.getPoints(100);
var points = points.concat(p6);

const c7 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -19, 12.5, -27.5),
	new THREE.Vector3( -22, 10, -25),
	new THREE.Vector3( -22, 7.5, -17.5 ),
	new THREE.Vector3( -22, 7.5, -12.5)
);
const p7 = c7.getPoints(100);
var points = points.concat(p7);

const c8 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -22, 7.5, -12.5),
	new THREE.Vector3( -22, 7.5, -7.5),
	new THREE.Vector3( -22, 12.5, -5 ),
	new THREE.Vector3( -22, 12.5, -2.5)
);
const p8 = c8.getPoints(100);
var points = points.concat(p8);

const c9 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -22, 12.5, -2.5),
	new THREE.Vector3( -22, 12.5, 0),
	new THREE.Vector3( -22, 7.5, 2.5 ),
	new THREE.Vector3( -22, 7.5, 10)
);
const p9 = c9.getPoints(100);
var points = points.concat(p9);

const c10 = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -22, 7.5, 10),
	new THREE.Vector3( -22, 7.5, 17.5),
	new THREE.Vector3( 0, 5, 25 ),
	new THREE.Vector3( 0, 5, 15)
);
const p10 = c10.getPoints(100);
var points = points.concat(p10);

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
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
  //console.log(time);
  update_ball();

  //curve.points[1].y = Math.sin(time) * 2.5;

  //geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

  //curveObject.geometry.dispose();
  //curveObject.geometry = geometry;


  requestAnimationFrame(render);
}