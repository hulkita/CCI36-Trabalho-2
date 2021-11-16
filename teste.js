console.info("teste");
import * as THREE from './build/three.module.js';

let camera, scene, renderer,clock;
let dirLight, spotLight;
let cube;
let dirLightShadowMapViewer, spotLightShadowMapViewer;
let y=0;

let isUserInteracting = false,
    onPointerDownMouseX = 0, onPointerDownMouseY = 0,
    lon = 0, onPointerDownLon = 0,
    lat = 0, onPointerDownLat = 0,
    phi = 0, theta = 0;

init();
animate();

function init() {

    const container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1100 );
    camera.position.set( 30, 30, 50 );
    scene = new THREE.Scene();

    const geo = new THREE.SphereGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geo.scale( - 1, 1, 1 );

    const texture = new THREE.TextureLoader().load( 'img/img1.jpg' );
    const mat = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh = new THREE.Mesh( geo, mat );

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    container.appendChild( renderer.domElement );

    container.style.touchAction = 'none';
    container.addEventListener( 'pointerdown', onPointerDown );

    
    //cube

    let geometry = new THREE.BoxGeometry( 3, 3, 3 );
    let material = new THREE.MeshPhongMaterial( {
        color: 0xff0000,
        shininess: 150,
        specular: 0x222222
    } );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set( 5, 10, 7 );
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add( cube );
    
    //ground

    geometry = new THREE.BoxGeometry( 10, 0.15, 10 );
    material = new THREE.MeshPhongMaterial( {
        color: 0xa0adaf,
        shininess: 150,
        specular: 0x111111
    } );

    const ground = new THREE.Mesh( geometry, material );
    ground.scale.multiplyScalar( 5 );
    ground.position.set( 0, -2, 0 );
    ground.castShadow = false;
    ground.receiveShadow = true;
    scene.add( ground );

    // sun
    
    geometry = new THREE.SphereGeometry( 10, 32, 16 );
    material = new THREE.MeshPhongMaterial( {
        color: 0xFFD700,
        shininess: 150,
        specular: 0x111111
    } );

    const sun = new THREE.Mesh( geometry, material );
    sun.scale.multiplyScalar( 1 );
    sun.position.set( 20, 500, 20 );
    sun.castShadow = false;
    sun.receiveShadow = false;
    scene.add( sun );

    // Lights

    scene.add( new THREE.AmbientLight( 0x404040 ) );

    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.name = 'Spot Light';
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.3;
    spotLight.position.set( 20, 500, 20 );
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 8;
    spotLight.shadow.camera.far = 1000;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add( spotLight );

    scene.add( new THREE.CameraHelper( spotLight.shadow.camera ) );

    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.name = 'Dir. Light';
    dirLight.position.set( 20, 50, 20 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.left = - 15;
    dirLight.shadow.camera.top	= 15;
    dirLight.shadow.camera.bottom = - 15;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add( dirLight );

    //scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    //initShadowMapViewers()
    //listener


    document.addEventListener( 'wheel', onDocumentMouseWheel );

    //

    document.addEventListener( 'dragover', function ( event ) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

    } );

    document.addEventListener( 'dragenter', function () {

        document.body.style.opacity = 0.5;

    } );

    document.addEventListener( 'dragleave', function () {

        document.body.style.opacity = 1;

    } );

    document.addEventListener( 'drop', function ( event ) {

        event.preventDefault();

        const reader = new FileReader();
        reader.addEventListener( 'load', function ( event ) {

            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;

        } );
        reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

        document.body.style.opacity = 1;

    } );

    //

    window.addEventListener( 'resize', onWindowResize );

    clock = new THREE.Clock();
    
    //initShadowMapViewers();
}

function initShadowMapViewers() {

dirLightShadowMapViewer = new ShadowMapViewer( dirLight );
spotLightShadowMapViewer = new ShadowMapViewer( spotLight );
resizeShadowMapViewers();

}

function resizeShadowMapViewers() {

const size = window.innerWidth * 0.15;

dirLightShadowMapViewer.position.x = 10;
dirLightShadowMapViewer.position.y = 10;
dirLightShadowMapViewer.size.width = size;
dirLightShadowMapViewer.size.height = size;
dirLightShadowMapViewer.update(); //Required when setting position or size directly

spotLightShadowMapViewer.size.set( size, size );
spotLightShadowMapViewer.position.set( size + 20, 10 );
// spotLightShadowMapViewer.update();	//NOT required because .set updates automatically

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerDown( event ) {

    if ( event.isPrimary === false ) return;

    isUserInteracting = true;

    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

    document.addEventListener( 'pointermove', onPointerMove );
    document.addEventListener( 'pointerup', onPointerUp );

}

function onPointerMove( event ) {

    if ( event.isPrimary === false ) return;

    lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon;
    lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat;

}

function onPointerUp() {

    if ( event.isPrimary === false ) return;

    isUserInteracting = false;

    document.removeEventListener( 'pointermove', onPointerMove );
    document.removeEventListener( 'pointerup', onPointerUp );

}

function onDocumentMouseWheel( event ) {

    const fov = camera.fov + event.deltaY * 0.05;

    camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );

    camera.updateProjectionMatrix();

}

function animate() {

    requestAnimationFrame( animate );                
    update();

}

function update() {

    const delta = clock.getDelta();

    if ( isUserInteracting === false ) {

        lon += 0.0;

    }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.MathUtils.degToRad( 90 - lat );
    theta = THREE.MathUtils.degToRad( lon );

    var valor = -100;

    const x = valor * Math.sin( phi ) * Math.cos( theta );
    const y = valor*Math.cos( phi );
    const z = valor * Math.sin( phi ) * Math.sin( theta );

    
    cube.rotation.x += 0.25 * delta;
    cube.rotation.y += 2 * delta;
    cube.rotation.z += 1 * delta;
    

    camera.lookAt( x, y, z );

    //camera.position.set(x, y, z);

    renderer.render( scene, camera );

}
