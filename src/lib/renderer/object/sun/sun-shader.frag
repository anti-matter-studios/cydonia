varying vec3 vLocalNormal;

void main() {
    vec3 normal = normalize(vLocalNormal);
    vec3 lightDirection = vec3(-.45, .55, .7);

    float light = dot(normal, lightDirection) * 0.5 + 0.5;
    float shade = smoothstep(0.12, 1.0, light);

    vec3 color = mix(vec3(1, .9, .34), vec3(.86, .57, .11), shade);

    gl_FragColor = vec4(color, 1.0);
}
