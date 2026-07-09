uniform vec3 uHighlightColor;
uniform vec3 uLightDirection;
uniform vec3 uShadowColor;

varying vec3 vLocalNormal;

void main() {
    vec3 normal = normalize(vLocalNormal);
    vec3 lightDirection = normalize(uLightDirection);

    float light = dot(normal, lightDirection) * 0.5 + 0.5;
    float shade = smoothstep(0.2, 1.0, light);
    float shadeSteps = 7.0;
    shade = floor(shade * (shadeSteps - 1.0)) / (shadeSteps - 1.0);

    vec3 color = mix(uShadowColor, uHighlightColor, shade);
    if (light > 0.95) {
        color = mix(color, vec3(1.0, 0.92, 0.84), light - 0.3);
    }

    gl_FragColor = vec4(color, 1.0);
}
