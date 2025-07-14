import * as THREE from 'three';
import { vertexShader, fluidShader, displayShader } from "./shaders.js";

const config = {
    brushSize: 25.0,
    brushStrength: 0.5,
    distortionAmount: 2.5,
    fluidDecay: 0.98,
    trailLength: 0.8,
    stopDecay: 0.85,
    color1: "#E7E8D1",
    color2: "#5D7B6F",
    color3: "#E7E8D1",
    color4: "#A7BEAE",
    colorIntensity: 1.0,
    softness: 1.0,
};


function hexToRgb (hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255; 
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255; 
    return [r, g, b];
}

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); 
const renderer = new THREE.WebGLRenderer({ antialias: true });

let gradientCanvas = null;

function initBackground(canvasElement) {
    try {
        gradientCanvas = canvasElement || document.querySelector("#gradient-canvas");
        if (!gradientCanvas) {
            console.error("Canvas element not found");
            return;
        }
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Replace the canvas with the renderer's canvas
        const parent = gradientCanvas.parentElement;
        if (parent) {
            parent.replaceChild(renderer.domElement, gradientCanvas);
            gradientCanvas = renderer.domElement;
            gradientCanvas.id = "gradient-canvas";
            gradientCanvas.className = "fixed top-0 left-0 w-full h-full -z-10";
        }
        
        // Initialize the render targets
        fluidTarget1.setSize(window.innerWidth, window.innerHeight);
        fluidTarget2.setSize(window.innerWidth, window.innerHeight);
        
        // Attach mouse event listeners to the canvas element
        attachMouseListeners();
        
        // Start the animation loop
        if (!animationStarted) {
            animate();
        }
    } catch (error) {
        console.error("Error initializing background:", error);
    }
}

// If running in browser environment without React
if (typeof window !== 'undefined' && !gradientCanvas) {
    gradientCanvas = document.querySelector("#gradient-canvas");
    if (gradientCanvas) {
        initBackground(gradientCanvas);
    }
}


const fluidTarget1 = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
    }
);

const fluidTarget2 = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
    }
);

let currentFluidTarget = fluidTarget1;
let previousFluidTarget = fluidTarget2;
let frameCount = 0;

const fluidMaterial = new THREE.ShaderMaterial({
    uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: config.brushSize },
        uBrushStrength: { value: config.brushStrength },
        uFluidDecay: { value: config.fluidDecay },
        uTrialLength: { value: config.trailLength },
        uStopDecay: { value: config.stopDecay },
    },
    vertexShader: vertexShader,
    fragmentShader: fluidShader,
});

const displayMaterial = new THREE.ShaderMaterial({
    uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iFluid: { value: null },
        uDistortionAmount: { value: config.distortionAmount },
        uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
        uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
        uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
        uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
        uColorIntensity: { value: config.colorIntensity },
        uSoftness: { value: config.softness },
    },
    vertexShader: vertexShader,
    fragmentShader: displayShader,
});

const geometry = new THREE.PlaneGeometry(2, 2);
const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
const displayPlane = new THREE.Mesh(geometry, displayMaterial);

let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0; 
let prevMouseY = 0;
let lastMoveTime = 0;

function attachMouseListeners() {
    if (!gradientCanvas) return;
    
    gradientCanvas.addEventListener("mousemove", (e) => {
        const rect = gradientCanvas.getBoundingClientRect();
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = e.clientX - rect.left;
        mouseY = rect.height - (e.clientY - rect.top); // Flip Y axis for WebGL coordinate system
        lastMoveTime = performance.now();
        
        // Always update mouse position when moving (no click required)
        fluidMaterial.uniforms.iMouse.value.set(
            mouseX,
            mouseY,
            prevMouseX,
            prevMouseY
        );
        
        // Debug logging
        console.log("Mouse:", mouseX.toFixed(1), mouseY.toFixed(1), "Prev:", prevMouseX.toFixed(1), prevMouseY.toFixed(1));
    });

    gradientCanvas.addEventListener("mouseleave", () => {
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
        console.log("Mouse left canvas");
    });
}

let animationStarted = false;

function animate() {
    if (!animationStarted) {
        animationStarted = true;
    }
    
    requestAnimationFrame(animate);

    if (!gradientCanvas) return;

    const time = performance.now() * 0.001;
    fluidMaterial.uniforms.iTime.value = time;
    displayMaterial.uniforms.iTime.value = time;
    fluidMaterial.uniforms.iFrame.value = frameCount;

    if (performance.now() - lastMoveTime > 100) { 
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    }

    fluidMaterial.uniforms.uBrushSize.value = config.brushSize;
    fluidMaterial.uniforms.uBrushStrength.value = config.brushStrength;
    fluidMaterial.uniforms.uFluidDecay.value = config.fluidDecay;
    fluidMaterial.uniforms.uTrialLength.value = config.trailLength;
    fluidMaterial.uniforms.uStopDecay.value = config.stopDecay;


    displayMaterial.uniforms.uDistortionAmount.value = config.distortionAmount;
    displayMaterial.uniforms.uColorIntensity.value = config.colorIntensity;
    displayMaterial.uniforms.uSoftness.value = config.softness;
    displayMaterial.uniforms.uColor1.value.set(...hexToRgb(config.color1));
    displayMaterial.uniforms.uColor2.value.set(...hexToRgb(config.color2));
    displayMaterial.uniforms.uColor3.value.set(...hexToRgb(config.color3));
    displayMaterial.uniforms.uColor4.value.set(...hexToRgb(config.color4));

    fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
    renderer.setRenderTarget(currentFluidTarget);
    renderer.render(fluidPlane, camera);

    displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
    renderer.setRenderTarget(null);
    renderer.render(displayPlane, camera);

    const temp = currentFluidTarget;
    currentFluidTarget = previousFluidTarget;
    previousFluidTarget = temp;

    frameCount++;
}  

window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    fluidMaterial.uniforms.iResolution.value.set(width, height);
    displayMaterial.uniforms.iResolution.value.set(width, height);

    fluidTarget1.setSize(width, height);
    fluidTarget2.setSize(width, height);
    frameCount = 0;
});

// Export the initialization function
export { initBackground };

// Only auto-start if not in a module environment
if (typeof window !== 'undefined' && gradientCanvas) {
    animate();
}