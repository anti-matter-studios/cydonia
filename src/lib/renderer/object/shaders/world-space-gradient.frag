uniform vec3 uHighlightColor;
uniform vec3 uLightDirection;
uniform vec3 uShadowColor;

varying vec3 vLocalNormal;

void main() {
    vec3 normal = normalize(vLocalNormal);
    vec3 lightDirection = normalize(uLightDirection);

    float light = dot(normal, lightDirection) * 0.5 + 0.5;
    float shade = smoothstep(0.12, 1.0, light);

    vec3 color = mix(uShadowColor, uHighlightColor, shade);

    gl_FragColor = vec4(color, 1.0);
}
