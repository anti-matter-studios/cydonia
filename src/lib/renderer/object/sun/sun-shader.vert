varying vec3 vLocalNormal;

void main() {
    vLocalNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
